import { Action } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { Publication } from 'src/app/models/publication.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';

export class LoadListPublications implements Action {
    readonly type = GlobalActionTypes.LoadListPublications;
    constructor() {}
}

export class UpdateListPublications implements Action {
    readonly type = GlobalActionTypes.UpdateListPublications;
    constructor(public publications: Array<Publication>) {}
}

export class UpdatePublicationFilterExclusiveStartKey implements Action {
    readonly type = GlobalActionTypes.UpdatePublicationFilterExclusiveStartKey;
    constructor(public id: string) {}
}

export class UpdatePublicationFilterAndReloadPublications implements Action {
    readonly type = GlobalActionTypes.UpdatePublicationFilterAndReloadPublications;
    constructor(public publicationFilter: PublicationFilter) {}
}

export class ClearListPublications implements Action {
    readonly type = GlobalActionTypes.ClearListPublications;
    constructor() {}
}

export class UpdatePublicationFilter implements Action {
    readonly type = GlobalActionTypes.UpdatePublicationFilter;
    constructor(public publicationFilter: PublicationFilter) {}
}