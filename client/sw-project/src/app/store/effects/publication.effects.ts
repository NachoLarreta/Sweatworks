import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PublicationService } from 'src/app/services/publication.service';
import { Store, Action } from '@ngrx/store';
import { State } from '../reducers';
import { Observable } from 'rxjs';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { concatMap, switchMap, take, map } from 'rxjs/operators';
import { GlobalStateEnum } from '../models/globalState.enum';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';
import { UpdatePublicationFilterExclusiveStartKey, UpdateListPublications, ClearListPublications, UpdatePublicationFilter } from '../actions/publication.actions';

@Injectable()
export class PublicationEffects {

  constructor(private actions$: Actions, private publicationService: PublicationService, private store: Store<State>) {}

  @Effect()
  loadPublications$: Observable<Action> = this.actions$.pipe(
    ofType(GlobalActionTypes.LoadListPublications),
    concatMap(() => {return this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.PUBLICATION_LIST, GlobalStateEnum.FILTERS).pipe(take(1))}),
    switchMap((publicationFilter: PublicationFilter) => this.find(publicationFilter))
  );

  @Effect()
  updateFiltersAndReloadPublications$: Observable<Action> = this.actions$.pipe(
    ofType(GlobalActionTypes.UpdatePublicationFilterAndReloadPublications),
    switchMap((action: any) => this.clearFiltersAndPublications(action.publicationFilter))
  );

  clearFiltersAndPublications(publicationFilter) {
    this.store.dispatch(new ClearListPublications());
    publicationFilter.exclusiveStartKey = null;
    this.store.dispatch(new UpdatePublicationFilter(publicationFilter));
    return this.find(publicationFilter);
  }

  find(publicationFilter: PublicationFilter) {
    if (publicationFilter.author){
      return this.publicationService.findAllByAuthor(publicationFilter)
      .pipe(
        map(response => this.findAllOK(response))
      )
    } else {
      return this.publicationService.findAll(publicationFilter)
      .pipe(
        map(response => this.findAllOK(response))
      )
    }
  }

  findAllOK(response){
    for (let publication of response.publications){
      publication.date = new Date(publication.date);
    }
    if (response.exclusiveStartKey){
      this.store.dispatch(new UpdatePublicationFilterExclusiveStartKey(response.exclusiveStartKey.id));
    } else {
      this.store.dispatch(new UpdatePublicationFilterExclusiveStartKey(null));
    }
    return new UpdateListPublications(response.publications);
  }

}