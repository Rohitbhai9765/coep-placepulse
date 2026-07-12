export interface Student {
  _id?: string;

  name: string;

  rollNo: string;

  email: string;

  phone: string;

  branch:
    | "Civil"
    | "CSE"
    | "Electrical"
    | "ENTC"
    | "Instrumentation"
    | "Manufacturing"
    | "Mechanical"
    | "Metallurgy"
    | "Planning"
    | "Robotics & AI";

  cgpa: number;

  backlogs: number;

  passingYear: number;

  // Placement Profile
  skills: string[];

  linkedin: string;

  github: string;

  preferredRole: string;

  preferredLocation: string;

  resumeUrl?: string;

  // Placement Status
  placementStatus:
    | "Unplaced"
    | "Placed"
    | "Higher Studies"
    | "Entrepreneur";

  placedCompany: string;

  package: number;

  // Applications
  appliedCompanies: string[];

  applications?: string[];

  offerDate?: string;

  createdAt?: string;

  updatedAt?: string;
}