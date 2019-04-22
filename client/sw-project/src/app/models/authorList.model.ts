import { Author } from './author.model';
import { AuthorFilter } from './authorFilter.model';

export class AuthorList {
    
    list: Array<Author>;
    filters: AuthorFilter;
    
    constructor(){
        this.list = new Array<Author>();
        this.filters = new AuthorFilter();
    }

}