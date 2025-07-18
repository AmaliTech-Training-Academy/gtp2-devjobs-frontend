






/* Employer CRUD */
/* Get employer jobs */
export interface GetEmployerJobsResponse {
  success: boolean;
  message: string;
  data: EmployerJobsData;
  timestamp: string;
  error: boolean;
  errors: string[];
}


export interface EmployerJobsData {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  sort: SortInfo;
  pageable: Pageable;
  content: EmployerJob[];
  empty: boolean;
}



<<<<<<< HEAD




/* Employer CRUD */
/* Get employer jobs */
export interface GetEmployerJobsResponse {
  success: boolean;
  message: string;
  data: EmployerJobsData;
  timestamp: string;
  error: boolean;
  errors: string[];
}


export interface EmployerJobsData {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  sort: SortInfo;
  pageable: Pageable;
  content: EmployerJob[];
  empty: boolean;
}



=======
>>>>>>> 79c735c5f1bd82695bbb35d1dcf910962ca80e14
export interface EmployerJob {
  id: string;
  createdAt: string;
  updatedAt: string;
  employer: Employer;
  company: Company;
  title: string;
  description: string;
  location: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | string;
  salary: number;
  currency: string;
  isActive: boolean;
  applicationDeadline: string;
  requiredSkills: RequiredSkill[];
  applicationCount: number;
}


export interface Employer {
  id: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[]; // e.g. ["ROLE_ADMIN"]
}


export interface Company {
  id: string;
  companyName: string;
  location: string;
  website: string;
}


export interface RequiredSkill {
  skillId: string;
  skillName: string;
  skillCategory: string;
  requiredLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | string;
  isMandatory: boolean;
  addedAt: string;
}


export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}


export interface Pageable {
  offset: number;
  paged: boolean;
  sort: SortInfo;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}




/* Post Job Response */
export interface CreateJobPayload {
  companyId: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | string;
  companyName: string;
  salary: number;
  currency: 'USD' | 'EUR' | 'GHS' | string;
  applicationDeadline: string; // ISO string (e.g. "2025-07-17T19:21:18.262Z")
}


export interface CreatedJobResponse {
  success: boolean;
  message: string;
  data: EmployerJob;
  timestamp: string;
  error: boolean;
  errors: string[];
}




/* Update Job Response */
export interface UpdateJobPayload {
  title: string;
  description: string;
  location: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP'; // expand as needed
  salary: number;
  currency: 'USD' | 'EUR' | 'GBP' | string; // or just string if dynamic
  isActive: boolean;
  applicationDeadline: string; // ISO string
}


export interface UpdatedJobResponse {
  success: boolean;
  message: string;
  data: EmployerJob;
  timestamp: string;
  error: boolean;
  errors: string[];
}




/* Delete job response */
export interface DeleteJobResponse {
  success: boolean;
  message: string;
  data: {}; // Or: Record<string, never>
  timestamp: string;
  error: boolean;
  errors: string[];
}



/* Get a unique job response */
export interface GetEmployerJobResponse {
  success: boolean;
  message: string;
  data: EmployerJob;
  timestamp: string;
  error: boolean;
  errors: string[];
}

