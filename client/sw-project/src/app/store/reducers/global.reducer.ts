import { GlobalActionTypes } from '../models/globalActionTypes.enum';
import { GlobalActions } from '../models/globalActions.type';
import { GlobalState } from '../models/globalState.model';
import { AuthorList } from 'src/app/models/authorList.model';
import { PublicationList } from 'src/app/models/publicationList.model';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';
import { Publication } from 'src/app/models/publication.model';
import { Author } from 'src/app/models/author.model';

let initialState: GlobalState = {
  authorList: new AuthorList(),
  publicationList: new PublicationList()
};

export function globalReducer(state = initialState, action: GlobalActions): GlobalState {
    let publicationFilter;
    let authorFilter;
    switch (action.type) {
      case GlobalActionTypes.UpdateListAuthors:
        state.authorList.list = state.authorList.list.concat(action.authors);
        return { ...state };
      case GlobalActionTypes.UpdateListPublications:
        state.publicationList.list = state.publicationList.list.concat(action.publications);
        return { ...state };
      case GlobalActionTypes.ClearListPublications:
        state.publicationList.list = new Array<Publication>();
        return { ...state };
      case GlobalActionTypes.UpdateAuthorFilterExclusiveStartKey:
        authorFilter = new AuthorFilter();
        authorFilter.limit = state.authorList.filters.limit;
        authorFilter.orderType = state.authorList.filters.orderType;
        authorFilter.exclusiveStartKey = action.id;
        state.authorList.filters = authorFilter;   
        return { ...state };
      case GlobalActionTypes.UpdatePublicationFilterExclusiveStartKey:
        publicationFilter = new PublicationFilter();
        publicationFilter.limit = state.publicationList.filters.limit;
        publicationFilter.orderType = state.publicationList.filters.orderType;
        publicationFilter.exclusiveStartKey = action.id;
        publicationFilter.search = state.publicationList.filters.search;
        publicationFilter.author = state.publicationList.filters.author; 
        state.publicationList.filters = publicationFilter;   
        return { ...state };
      case GlobalActionTypes.UpdatePublicationFilter:
        publicationFilter = new PublicationFilter();
        publicationFilter.limit = action.publicationFilter.limit
        publicationFilter.orderType = action.publicationFilter.orderType;
        publicationFilter.exclusiveStartKey = null;
        publicationFilter.search = action.publicationFilter.search;
        publicationFilter.author = action.publicationFilter.author; 
        state.publicationList.filters = publicationFilter;
        return { ...state };
      case GlobalActionTypes.ClearListAuthors:
        state.authorList.list = new Array<Author>();
        return { ...state };
      case GlobalActionTypes.UpdateAuthorFilter: 
        authorFilter = new AuthorFilter();
        authorFilter.exclusiveStartKey = null;
        authorFilter.limit = action.authorFilter.limit;
        authorFilter.orderType = action.authorFilter.orderType;
        state.authorList.filters = authorFilter;
        return { ...state };
      default:
        return state;
    }
}