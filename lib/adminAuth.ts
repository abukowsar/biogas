// Edge-safe (Web Crypto only, no Node APIs) — imported by proxy.ts which runs on
// the Edge runtime, and by the Node-runtime API routes for issuing cookies.
const encoder = new TextEncoder();
const COOKIE_NAME = "admin_session";
export const ROOT_USERNAME = "root";

function toHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64Url(s: string) {
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string) {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
  return atob(padded);
}

async function sign(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(sig);
}

export type SessionPayload = { u: string; iat: number };

export async function createSessionCookieValue(username: string, secret: string): Promise<string> {
  const payload: SessionPayload = { u: username, iat: Date.now() };
  const payloadB64 = toBase64Url(JSON.stringify(payload));
  const sig = await sign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export async function verifySessionCookieValue(
  value: string | undefined,
  secret: string
): Promise<SessionPayload | null> {
  if (!value) return null;
  const [payloadB64, sig] = value.split(".");
  if (!payloadB64 || !sig) return null;

  const expected = await sign(payloadB64, secret);
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return null;

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64)) as SessionPayload;
    if (typeof payload.u !== "string") return null;
    return payload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
