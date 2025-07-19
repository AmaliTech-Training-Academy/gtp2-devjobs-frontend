export interface AllJobsResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  error: boolean;
  errors: string[] | null;
}
export interface JobByIdResponse {
  success: boolean;
  message: string;
  data: Job;
  timestamp: string;
  error: boolean;
  errors: string[];
}

export interface Data {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Job[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  sort: Sort;
  empty: boolean;
}

export interface Job {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  employer: Employer;
  company: Company;
  title: string;
  description: string;
  descriptions: JobDescription[] | null;
  location: string;
  employmentType: string;
  salary: number;
  currency: string;
  isActive: boolean;
  applicationDeadline: Date;
  requiredSkills: RequiredSkill[];
  applicationCount: number;
}

export interface Company {
  id: string;
  companyName: string;
  location: string;
  website: string;
}

export interface Employer {
  id: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface RequiredSkill {
  skillId: string;
  skillName: string;
  skillCategory: string;
  requiredLevel: string;
  isMandatory: boolean;
  addedAt: Date;
}

export interface Pageable {
  offset: number;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface JobDescription {
  title: string;
  description: string;
}
