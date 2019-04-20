import { Action } from '@ngrx/store';
import { GlobalActionTypes } from './globalActionTypes.enum';
import { Author } from 'src/app/models/author.model';
import { Publication } from 'src/app/models/publication.model';

export class UpdateListAuthors implements Action {
    readonly type = GlobalActionTypes.UpdateListAuthors;
    constructor(public authors: Array<Author>) {}
}

export class UpdateListPublications implements Action {
    readonly type = GlobalActionTypes.UpdateListPublications;
    constructor(public publications: Array<Publication>) {}
}

export class UpdateSearch implements Action {
    readonly type = GlobalActionTypes.UpdateSearch;
    constructor(public search: string) {}
}

export class UpdateAscendingOrderDate implements Action {
    readonly type = GlobalActionTypes.UpdateAscendingOrderDate;
    constructor(public ascendingOrderDate: boolean) {}
}

export class UpdateAuthorSelect implements Action {
    readonly type = GlobalActionTypes.UpdateAuthorSelect;
    constructor(public author: Author) {}
}