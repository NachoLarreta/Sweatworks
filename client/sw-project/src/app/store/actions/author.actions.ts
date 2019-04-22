import { Action } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { Author } from 'src/app/models/author.model';
import { AuthorFilter } from 'src/app/models/authorFilter.model';

export class LoadListAuthors implements Action {
    readonly type = GlobalActionTypes.LoadListAuthors;
    constructor() {}
}

export class UpdateListAuthors implements Action {
    readonly type = GlobalActionTypes.UpdateListAuthors;
    constructor(public authors: Array<Author>) {}
}

export class UpdateAuthorFilterExclusiveStartKey implements Action {
    readonly type = GlobalActionTypes.UpdateAuthorFilterExclusiveStartKey;
    constructor(public id: string) {}
}

export class UpdateAuthorFilter implements Action {
    readonly type = GlobalActionTypes.UpdateAuthorFilter;
    constructor(public authorFilter: AuthorFilter) {}
}

export class ClearListAuthors implements Action {
    readonly type = GlobalActionTypes.ClearListAuthors;
    constructor() {}
}

export class UpdateAuthorFilterAndReloadAuthors implements Action {
    readonly type = GlobalActionTypes.UpdatePublicationFilterAndReloadAuthors;
    constructor(public authorFilter: AuthorFilter) {}
}
