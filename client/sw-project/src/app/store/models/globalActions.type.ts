import { UpdateListAuthors, LoadListAuthors, UpdateAuthorFilterExclusiveStartKey, UpdateAuthorFilterAndReloadAuthors, ClearListAuthors, UpdateAuthorFilter } from '../actions/author.actions';
import { UpdateListPublications, UpdatePublicationFilterExclusiveStartKey, ClearListPublications, UpdatePublicationFilter, LoadListPublications } from '../actions/publication.actions';

export type GlobalActions = 
    UpdateListAuthors | 
    UpdateListPublications | 
    LoadListAuthors | 
    UpdateAuthorFilterExclusiveStartKey | 
    UpdatePublicationFilterExclusiveStartKey | 
    ClearListPublications | 
    UpdatePublicationFilter | 
    LoadListPublications |
    UpdateAuthorFilterAndReloadAuthors |
    ClearListAuthors |
    UpdateAuthorFilter;