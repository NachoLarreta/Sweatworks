import { Author } from 'src/app/models/author.model';
import { Publication } from 'src/app/models/publication.model';

export class GlobalState {
    listAuthors: Array<Author>;
    listPublications: Array<Publication>
    ascendingOrderDate: boolean;
    search: string;
    authorSelect: Author;
}