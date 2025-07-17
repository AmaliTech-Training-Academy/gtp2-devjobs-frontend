import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCardCarouselComponent } from './landing-card-carousel.component';

describe('LandingCardCarouselComponent', () => {
  let component: LandingCardCarouselComponent;
  let fixture: ComponentFixture<LandingCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCardCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
