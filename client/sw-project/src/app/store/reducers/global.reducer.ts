import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { GlobalActions } from '../models/globalActions.type';
import { GlobalState } from '../models/globalState.model';
import { Author } from 'src/app/models/author.model';
import { Publication } from 'src/app/models/publication.model';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';

let initialState: GlobalState = {
  listAuthors: new Array<Author>(),
  listPublications: new Array<Publication>(),
  authorFilter: new AuthorFilter(),
  publicationFilter: new PublicationFilter()
};

export function globalReducer(state = initialState, action: GlobalActions): GlobalState {
    switch (action.type) {
      case GlobalActionTypes.UpdateListAuthors:
        let listAuthors = state.listAuthors.concat(action.authors);
        return { ...state, listAuthors };
      case GlobalActionTypes.UpdateListPublications:
        return { ...state, listPublications: action.publications };
      case GlobalActionTypes.UpdateAuthorFilter:
        return { ...state, authorFilter: action.authorFilter };
      default:
        return state;
    }
}