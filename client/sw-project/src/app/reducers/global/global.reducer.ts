import { GlobalActionTypes } from './globalActionTypes.enum';
import { GlobalActions } from './globalActions.type';
import { GlobalState } from './globalState.model';

let initialState: GlobalState = {
  search: ""
};

export function globalReducer(state = initialState, action: GlobalActions): GlobalState {
    switch (action.type) {
      case GlobalActionTypes.Example:
        return { ...state, search: action.payload };
      default:
        return state;
    }
}