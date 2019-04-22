import { AuthorList } from 'src/app/models/authorList.model';
import { PublicationList } from 'src/app/models/publicationList.model';

export class GlobalState {

    authorList: AuthorList;
    publicationList: PublicationList;
    
    constructor(){
        this.authorList = new AuthorList();
        this.publicationList = new PublicationList();
    }
    
}