import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsDesktopComponent } from './authors-desktop.component';

describe('AuthorsDesktopComponent', () => {
  let component: AuthorsDesktopComponent;
  let fixture: ComponentFixture<AuthorsDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
