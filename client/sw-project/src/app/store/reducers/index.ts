import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { GlobalState } from '../models/globalState.model';
import { globalReducer } from './global.reducer';

export interface State {
  global: GlobalState
}

export const reducers: ActionReducerMap<State> = {
  global: globalReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
