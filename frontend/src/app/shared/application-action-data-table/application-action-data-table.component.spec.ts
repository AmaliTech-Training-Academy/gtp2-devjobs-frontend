import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationActionDataTableComponent } from './application-action-data-table.component';

describe('ApplicationActionDataTableComponent', () => {
  let component: ApplicationActionDataTableComponent;
  let fixture: ComponentFixture<ApplicationActionDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationActionDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationActionDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
