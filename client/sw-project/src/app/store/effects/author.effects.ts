import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthorService } from 'src/app/services/author.service';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { switchMap, map, concatMap, take } from 'rxjs/operators';
import { UpdateListAuthors } from '../actions/author.actions';
import { State } from '../reducers';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { UpdateAuthorFilter } from '../actions/filter.action';

@Injectable()
export class AuthorEffects {

  constructor(private actions$: Actions, private authorService: AuthorService, private store: Store<State>) {}

  @Effect()
  loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType(GlobalActionTypes.LoadListAuthors),
    concatMap(() => {return this.store.select("global", "authorFilter").pipe(take(1))}),
    switchMap((authorFilter: AuthorFilter) => this.findAll(authorFilter))
  );
  findAll(authorFilter) {
    return this.authorService.findAll(authorFilter)
      .pipe(
        map(response => this.findAllOK(authorFilter, response))
      )
  }
  findAllOK(authorFilter, response){
    if (response.exclusiveStartKey){
      authorFilter.exclusiveStartKey = response.exclusiveStartKey.id;
      this.store.dispatch(new UpdateAuthorFilter(authorFilter));
    } else {
      authorFilter.exclusiveStartKey = null;
      this.store.dispatch(new UpdateAuthorFilter(authorFilter));
    }
    return new UpdateListAuthors(response.authors);
  }

}