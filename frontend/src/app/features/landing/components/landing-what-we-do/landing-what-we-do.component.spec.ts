import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingWhatWeDoComponent } from './landing-what-we-do.component';

describe('LandingWhatWeDoComponent', () => {
  let component: LandingWhatWeDoComponent;
  let fixture: ComponentFixture<LandingWhatWeDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingWhatWeDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingWhatWeDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
