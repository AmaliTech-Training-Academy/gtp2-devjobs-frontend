import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerHttpRequestsService {
  // create job: Post: /api/v1/jobs
  // get job: GET /api/v1/jobs/employer
  /*update a job posting:
    PUT /api/v1/jobs/{id}
    
    delete a job posting:
    DELETE /api/v1/jobs/{id}
    
    get job posting details:
    GET /api/v1/jobs/{id}*/

  

  httpClient = inject( HttpClient )

  constructor() { }


  createNewJob(job: any) {
    return this.httpClient.post('https://api/v1/jobs', job )
  }


  getAllJobs() {
    return this.httpClient.get('https://api/v1/jobs/employer')
  }


  updateJob(jobID: string, newData: any) {
    return this.httpClient.put(`https://api/v1/jobs/${jobID}`, newData)
  }


  deleteJob(jobID: string) {
    return this.httpClient.delete(`https://api/v1/jobs/${jobID}`)
  }


  getJob(jobID: string) {
    return this.httpClient.get(`https://api/v1/jobs/${jobID}`)
  }




}
