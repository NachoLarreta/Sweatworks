import { Action } from '@ngrx/store';
import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { Publication } from 'src/app/models/publication.model';

export class UpdateListPublications implements Action {
    readonly type = GlobalActionTypes.UpdateListPublications;
    constructor(public publications: Array<Publication>) {}
}