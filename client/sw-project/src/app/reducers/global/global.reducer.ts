import { GlobalActionTypes } from './globalActionTypes.enum';
import { GlobalActions } from './globalActions.type';
import { GlobalState } from './globalState.model';
import { Author } from 'src/app/models/author.model';
import { Publication } from 'src/app/models/publication.model';

let initialState: GlobalState = {
  listAuthors: new Array<Author>(),
  listPublications: new Array<Publication>(),
  ascendingOrderDate: true,
  authorSelect: null,
  search: null
};

export function globalReducer(state = initialState, action: GlobalActions): GlobalState {
    switch (action.type) {
      case GlobalActionTypes.UpdateListAuthors:
        return { ...state, listAuthors: action.authors };
      case GlobalActionTypes.UpdateListPublications:
        return { ...state, listPublications: action.publications };
      case GlobalActionTypes.UpdateSearch:
        return { ...state, search: action.search };
      case GlobalActionTypes.UpdateAscendingOrderDate:
        return { ...state, ascendingOrderDate: action.ascendingOrderDate };
      case GlobalActionTypes.UpdateAuthorSelect:
        return { ...state, authorSelect: action.author };
      default:
        return state;
    }
}