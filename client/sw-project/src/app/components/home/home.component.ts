import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { UpdateAuthorFilter } from 'src/app/store/actions/filter.action';

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
    this.store.dispatch(new UpdateAuthorFilter(authorFilter));
  }

}
