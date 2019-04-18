import { Action } from '@ngrx/store';
import { GlobalActionTypes } from './globalActionTypes.enum';

export class Example implements Action {
    readonly type = GlobalActionTypes.Example;
    constructor(public payload: string) {}
}