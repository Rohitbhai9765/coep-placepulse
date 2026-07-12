export interface Announcement {
  _id?: string;

  title: string;

  description: string;

  priority: "Low" | "Medium" | "High";

  createdAt?: string;

  updatedAt?: string;
}