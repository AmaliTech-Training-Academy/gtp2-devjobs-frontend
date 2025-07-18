import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerAccountManagementComponent } from './seeker-account-management.component';

describe('SeekerAccountManagementComponent', () => {
  let component: SeekerAccountManagementComponent;
  let fixture: ComponentFixture<SeekerAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerAccountManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
