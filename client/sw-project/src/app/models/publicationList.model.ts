import { Publication } from './publication.model';
import { PublicationFilter } from './publicationFilter.model';

export class PublicationList {
    
    list: Array<Publication>;
    filters: PublicationFilter;

    constructor(){
        this.list = new Array<Publication>();
        this.filters = new PublicationFilter();
    }

}