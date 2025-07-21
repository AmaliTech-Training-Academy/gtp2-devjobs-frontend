import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobSelectionServiceService {
  private selectedJobSubject = new BehaviorSubject<any | null>( null )
  selectedJob$ = this.selectedJobSubject.asObservable()

  constructor() { }

  setSelectedJob( job: any ) {
    this.selectedJobSubject.next( job )
    console.log(job)
  }
}
