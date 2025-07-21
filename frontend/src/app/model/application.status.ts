import { Company } from "./all.jobs";

export interface ApplicationStatusResponse {
    success:   boolean;
    message:   string;
    data:      Data;
    timestamp: string;
    error:     boolean;
    errors:    string[];
}

export interface Data {
    totalElements:    number;
    totalPages:       number;
    size:             number;
    content:          AppliedJob[];
    number:           number;
    pageable:         Pageable;
    first:            boolean;
    last:             boolean;
    numberOfElements: number;
    sort:             Sort;
    empty:            boolean;
}

export interface AppliedJob {
    id:              string;
    createdAt:       Date;
    updatedAt:       Date;
    jobPosting:      JobPosting;
    applicant:       Applicant;
    company:         Company;
    coverLetter:     string;
    experienceYears: string;
    educationLevel:  string;
    contactPhone:    string;
    currentStatus:   string;
    submittedAt:     Date;
    statusHistory:   StatusHistory[];
    attachments:     Attachment[];
    educations:      Education[];
    experiences:     Experience[];
}

export interface Applicant {
    id:       string;
    username: string;
    email:    string;
    fullName: string;
    roles:    string[];
}

export interface Attachment {
    id:                string;
    createdAt:         Date;
    updatedAt:         Date;
    fileName:          string;
    originalName:      string;
    contentType:       string;
    fileSize:          number;
    attachmentType:    string;
    s3Url:             string;
    ownerId:           string;
    relatedEntityId:   string;
    relatedEntityType: string;
    downloadUrl:       string;
    uploadedAt:        Date;
}

export interface Education {
    applicationId: string;
    educationId:   string;
    school:        string;
    fieldOfStudy:  string;
    degree:        string;
    displayName:   string;
}

export interface Experience {
    applicationId: string;
    experienceId:  string;
    company:       string;
    jobTitle:      string;
    description:   string;
    displayName:   string;
}

export interface JobPosting {
    id:                  string;
    title:               string;
    companyName:         string;
    location:            string;
    employmentType:      string;
    salary:              number;
    currency:            string;
    createdAt:           Date;
    applicationDeadline: Date;
    isActive:            boolean;
}

export interface StatusHistory {
    id:            string;
    createdAt:     Date;
    updatedAt:     Date;
    status:        string;
    changedByUser: Applicant;
    notes:         string;
    changedAt:     Date;
}

export interface Pageable {
    paged:      boolean;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    unpaged:    boolean;
    sort:       Sort;
}

export interface Sort {
    sorted:   boolean;
    empty:    boolean;
    unsorted: boolean;
}
