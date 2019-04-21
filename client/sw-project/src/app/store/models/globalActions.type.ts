import { UpdateListAuthors, LoadListAuthors } from '../actions/author.actions';
import { UpdateListPublications } from '../actions/publication.actions';
import { UpdateAuthorFilter } from '../actions/filter.action';

export type GlobalActions = UpdateListAuthors | UpdateListPublications | LoadListAuthors | UpdateAuthorFilter;