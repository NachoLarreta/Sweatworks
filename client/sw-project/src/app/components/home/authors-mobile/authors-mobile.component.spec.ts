import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsMobileComponent } from './authors-mobile.component';

describe('AuthorsMobileComponent', () => {
  let component: AuthorsMobileComponent;
  let fixture: ComponentFixture<AuthorsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
