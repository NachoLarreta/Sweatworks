import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PublicationEffects } from './publication.effects';

describe('PublicationEffects', () => {
  let actions$: Observable<any>;
  let effects: PublicationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PublicationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
