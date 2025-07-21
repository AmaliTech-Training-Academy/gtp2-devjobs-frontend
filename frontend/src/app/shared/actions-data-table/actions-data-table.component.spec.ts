import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsDataTableComponent } from './actions-data-table.component';

describe('ActionsDataTableComponent', () => {
  let component: ActionsDataTableComponent;
  let fixture: ComponentFixture<ActionsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
