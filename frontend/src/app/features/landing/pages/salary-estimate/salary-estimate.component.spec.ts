import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryEstimateComponent } from './salary-estimate.component';

describe('SalaryEstimateComponent', () => {
  let component: SalaryEstimateComponent;
  let fixture: ComponentFixture<SalaryEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryEstimateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
