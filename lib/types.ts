import type { ApplicationStatus } from "./applicationStatus";

export type Application = {
  id: string;
  name: string;
  phone: string;
  address: string;
  cattle: number;
  members: number;
  note: string;
  status: ApplicationStatus;
  source: "public" | "admin";
  createdAt: string;
};
