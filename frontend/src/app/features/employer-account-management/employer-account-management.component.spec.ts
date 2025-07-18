import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAccountManagementComponent } from './employer-account-management.component';

describe('EmployerAccountManagementComponent', () => {
  let component: EmployerAccountManagementComponent;
  let fixture: ComponentFixture<EmployerAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerAccountManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
