import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { UpdateAuthorFilterAndReloadAuthors } from 'src/app/store/actions/author.actions';
import { UpdatePublicationFilterAndReloadPublications } from 'src/app/store/actions/publication.actions';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    let authorFilter = new AuthorFilter();
    authorFilter.limit = 10;
    authorFilter.orderType = "asc";
    this.store.dispatch(new UpdateAuthorFilterAndReloadAuthors(authorFilter));
    let publicationFilter = new PublicationFilter();
    publicationFilter.limit = 10;
    publicationFilter.orderType = "asc";
    this.store.dispatch(new UpdatePublicationFilterAndReloadPublications(publicationFilter));
  }

}
