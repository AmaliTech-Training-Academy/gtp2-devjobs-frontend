import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingJobCategoriesComponent } from './landing-job-categories.component';

describe('LandingJobCategoriesComponent', () => {
  let component: LandingJobCategoriesComponent;
  let fixture: ComponentFixture<LandingJobCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingJobCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingJobCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
