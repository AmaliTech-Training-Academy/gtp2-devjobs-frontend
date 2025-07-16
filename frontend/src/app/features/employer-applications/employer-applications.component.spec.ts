import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplicationsComponent } from './employer-applications.component';

describe('EmployerApplicationsComponent', () => {
  let component: EmployerApplicationsComponent;
  let fixture: ComponentFixture<EmployerApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
