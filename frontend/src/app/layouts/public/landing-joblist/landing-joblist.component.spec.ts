import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingJoblistComponent } from './landing-joblist.component';

describe('LandingJoblistComponent', () => {
  let component: LandingJoblistComponent;
  let fixture: ComponentFixture<LandingJoblistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingJoblistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingJoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
