import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthorEffects } from './author.effects';

describe('AuthorEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
