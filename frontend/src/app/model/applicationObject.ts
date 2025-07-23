export interface EmployerApplicationsResponse {
  success: boolean;
  message: string;
  data: ApplicationsPagination;
  timestamp: string;
  error: boolean;
  errors: string[];
}

export interface ApplicationsPagination {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: Application[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Pageable {
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  offset: number;
  sort: Sort;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Application {
  id: string;
  createdAt: string;
  updatedAt: string;
  jobPosting: JobPosting;
  applicant: User;
  company: Company;
  coverLetter: string;
  experienceYears: string;
  educationLevel: string;
  contactPhone: string;
  currentStatus: string; 
  submittedAt: string;
  statusHistory: StatusHistory[];
  attachments: Attachment[];
  educations: Education[];
  experiences: Experience[];
}

export interface JobPosting {
  id: string;
  title: string;
  companyName: string;
  location: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | string; 
  salary: number;
  currency: string;
  createdAt: string;
  applicationDeadline: string;
  isActive: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface Company {
  id: string;
  companyName: string;
  location: string;
  website: string;
  phoneNumber: string;
  companyLogoUrl: string;
}

export interface StatusHistory {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  changedByUser: User;
  notes: string;
  changedAt: string;
}

export interface Attachment {
  id: string;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  originalName: string;
  contentType: string;
  fileSize: number;
  attachmentType: 'RESUME' | 'COVER_LETTER' | string; 
  s3Url: string;
  ownerId: string;
  relatedEntityId: string;
  relatedEntityType: 'JOB' | 'APPLICATION' | string; 
  downloadUrl: string;
  uploadedAt: string;
}

export interface Education {
  applicationId: string;
  educationId: string;
  school: string;
  fieldOfStudy: string;
  degree: string;
  displayName: string;
}

export interface Experience {
  applicationId: string;
  experienceId: string;
  company: string;
  jobTitle: string;
  description: string;
  displayName: string;
}
