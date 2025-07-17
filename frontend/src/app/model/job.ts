export interface Job {
    id:             number;
    company:        string;
    companyUrl:     string;
    logo:           string;
    postedAt:       string;
    contract:       string;
    position:       string;
    location:       string;
    salary:         string;
    applyLink:      string;
    companyWebsite: string;
    description:    string;
    requirements:   Requirements;
    role:           Requirements;
}

export interface Requirements {
    content: string;
    items:   string[];
}
