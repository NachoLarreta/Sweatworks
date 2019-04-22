import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthorService } from 'src/app/services/author.service';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { switchMap, map, concatMap, take } from 'rxjs/operators';
import { UpdateListAuthors, UpdateAuthorFilterExclusiveStartKey, ClearListAuthors, UpdateAuthorFilter } from '../actions/author.actions';
import { State } from '../reducers';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { GlobalStateEnum } from '../models/globalState.enum';

@Injectable()
export class AuthorEffects {

  constructor(private actions$: Actions, private authorService: AuthorService, private store: Store<State>) {}

  @Effect()
  loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType(GlobalActionTypes.LoadListAuthors),
    concatMap(() => {return this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.AUTHOR_LIST, GlobalStateEnum.FILTERS).pipe(take(1))}),
    switchMap((authorFilter: AuthorFilter) => this.findAll(authorFilter))
  );

  @Effect()
  updateFiltersAndReloadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType(GlobalActionTypes.UpdatePublicationFilterAndReloadAuthors),
    switchMap((action: any) => this.clearFiltersAndAuthors(action.authorFilter))
  );

  clearFiltersAndAuthors(authorFilter) {
    this.store.dispatch(new ClearListAuthors());
    this.store.dispatch(new UpdateAuthorFilter(authorFilter));
    return this.findAll(authorFilter);
  }

  findAll(authorFilter) {
    return this.authorService.findAll(authorFilter)
      .pipe(
        map(response => this.findAllOK(response))
      )
  }
  
  findAllOK(response){
    for (let author of response.authors){
      author.dateOfBirth = new Date(author.dateOfBirth);
    }
    if (response.exclusiveStartKey){
      this.store.dispatch(new UpdateAuthorFilterExclusiveStartKey(response.exclusiveStartKey.id));
    } else {
      this.store.dispatch(new UpdateAuthorFilterExclusiveStartKey(null));
    }
    return new UpdateListAuthors(response.authors);
  }

}