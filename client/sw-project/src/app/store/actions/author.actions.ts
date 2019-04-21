import { Action } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { Author } from 'src/app/models/author.model';

export class LoadListAuthors implements Action {
    readonly type = GlobalActionTypes.LoadListAuthors;
    constructor() {}
}

export class UpdateListAuthors implements Action {
    readonly type = GlobalActionTypes.UpdateListAuthors;
    constructor(public authors: Array<Author>) {}
}