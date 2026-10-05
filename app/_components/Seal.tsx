export default function Seal({ size = 40 }: { size?: number }) {
  return (
    <svg className="seal" width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="21" fill="var(--primary)" />
      <path
        d="M22 10c5.2 4.2 7.8 8.1 7.8 12.5A7.8 7.8 0 0 1 22 30.3a7.8 7.8 0 0 1-7.8-7.8c0-4.4 2.6-8.3 7.8-12.5z"
        fill="#F4C76A"
      />
      <path d="M22 16.5c2.6 2.4 3.9 4.6 3.9 6.8a3.9 3.9 0 0 1-7.8 0c0-2.2 1.3-4.4 3.9-6.8z" fill="#fff" />
      <path d="M13 33.5h18" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
