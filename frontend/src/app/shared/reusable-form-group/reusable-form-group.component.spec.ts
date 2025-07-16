import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableFormGroupComponent } from './reusable-form-group.component';

describe('ReusableFormGroupComponent', () => {
  let component: ReusableFormGroupComponent;
  let fixture: ComponentFixture<ReusableFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableFormGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
