import { Author } from 'src/app/models/author.model';
import { Publication } from 'src/app/models/publication.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';
import { AuthorFilter } from 'src/app/models/authorFilter.model';

export class GlobalState {
    listAuthors: Array<Author>;
    listPublications: Array<Publication>;
    publicationFilter: PublicationFilter;
    authorFilter: AuthorFilter;
}