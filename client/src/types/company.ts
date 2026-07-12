export interface Company {
  _id?: string;

  name: string;
  logo: string;

  description: string;

  package: string;

  role: string;

  type: string;

  location: string;

  cgpa: number;

  eligibleBranches: string[];

  status: "Upcoming" | "Ongoing" | "Completed";

  rounds: string[];

  website: string;

  applyLink: string;

  createdAt?: string;

  updatedAt?: string;
}