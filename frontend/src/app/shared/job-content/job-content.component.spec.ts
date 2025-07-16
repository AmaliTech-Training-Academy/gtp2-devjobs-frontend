import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobContentComponent } from './job-content.component';

describe('JobContentComponent', () => {
  let component: JobContentComponent;
  let fixture: ComponentFixture<JobContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
