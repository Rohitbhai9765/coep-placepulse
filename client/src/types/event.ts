export interface Event {
  _id?: string;

  company: string;

  title: string;

  date: string;

  venue: string;

  round: string;

  status: "Upcoming" | "Completed" | "Cancelled";

  createdAt?: string;

  updatedAt?: string;
}