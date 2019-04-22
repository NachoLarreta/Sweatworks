import { Filter } from './filter.model';
import { Author } from './author.model';

export class PublicationFilter extends Filter {
    search: string;
    author: Author;
}