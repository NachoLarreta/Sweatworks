import { Action } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { AuthorFilter } from 'src/app/models/authorFilter.model';

export class UpdateAuthorFilter implements Action {
    readonly type = GlobalActionTypes.UpdateAuthorFilter;
    constructor(public authorFilter: AuthorFilter) {}
}