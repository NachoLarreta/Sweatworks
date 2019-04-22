export enum GlobalActionTypes {
  UpdateListAuthors = '[Author] Update list authors',
  UpdateListPublications = '[Publication] Update list publications',
  LoadListAuthors = '[Author] Load author list',
  UpdateAuthorFilter = '[Author Filter] Update Author Filter',
  UpdateAuthorFilterExclusiveStartKey = '[Author Filter] Update Author Filter Exclusive StartKey',
  LoadListPublications = '[Publication] Load publication list',
  UpdatePublicationFilterExclusiveStartKey = '[Publication] Update Publication Filter Exclusive StartKey',
  UpdatePublicationFilterAndReloadPublications = '[Publication] Update Publication Filter and reload publications',
  ClearListPublications = '[Publication] Clear List Publications',
  UpdatePublicationFilter = '[Publication] Update publication filter',
  ClearListAuthors = '[Author] Clear list authors',
  UpdatePublicationFilterAndReloadAuthors = '[Author] Update Author Filter and reload authors',
}