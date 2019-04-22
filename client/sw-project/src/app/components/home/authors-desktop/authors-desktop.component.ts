import { Component, OnInit, OnDestroy } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { LoadListAuthors } from 'src/app/store/actions/author.actions';
import { AuthorFilter } from 'src/app/models/authorFilter.model';
import { GlobalStateEnum } from 'src/app/store/models/globalState.enum';

@Component({
  selector: 'authors-desktop',
  templateUrl: './authors-desktop.component.html',
  styleUrls: ['./authors-desktop.component.scss']
})
export class AuthorsDesktopComponent implements OnInit, OnDestroy {

  authors: Array<Author>;
  authorFilter: AuthorFilter;

  private ngUnsubscribe: Subject<void>;

  constructor(private store: Store<State>) { 
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.AUTHOR_LIST, GlobalStateEnum.LIST)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(authors => this.authors = authors);
    this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.AUTHOR_LIST, GlobalStateEnum.FILTERS)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(authorFilter => {debugger; this.authorFilter = authorFilter});
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadAuthorsLazy(event) {
    let pos = (event.target.scrollTop || event.target.scrollTop) + event.target.offsetHeight;
    let max = event.target.scrollHeight-100;
    debugger;
    if(pos > max && this.authorFilter.exclusiveStartKey != null)   {
      this.store.dispatch(new LoadListAuthors());
    }
  }

}
