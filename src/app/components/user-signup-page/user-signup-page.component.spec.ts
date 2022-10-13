import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupPageComponent } from './user-signup-page.component';

describe('UserSignupPageComponent', () => {
  let component: UserSignupPageComponent;
  let fixture: ComponentFixture<UserSignupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
