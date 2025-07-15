import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPublicNavbarComponent } from './auth-public-navbar.component';

describe('AuthPublicNavbarComponent', () => {
  let component: AuthPublicNavbarComponent;
  let fixture: ComponentFixture<AuthPublicNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPublicNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPublicNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
