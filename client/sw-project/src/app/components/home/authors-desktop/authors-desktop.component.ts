import { Component, OnInit, OnDestroy } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { LoadListAuthors } from 'src/app/store/actions/author.actions';

@Component({
  selector: 'authors-desktop',
  templateUrl: './authors-desktop.component.html',
  styleUrls: ['./authors-desktop.component.scss']
})
export class AuthorsDesktopComponent implements OnInit, OnDestroy {

  authors: Array<Author>;

  private ngUnsubscribe: Subject<void>;

  constructor(private store: Store<State>) { 
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.select("global", "listAuthors").pipe(takeUntil(this.ngUnsubscribe)).subscribe(authors => this.authors = authors);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadAuthorsLazy(event) {
    debugger;
    this.store.dispatch(new LoadListAuthors());
    //event.first = First row offset
    //event.rows = Number of rows per page
    //this.lazyCars = load new chunk between first index and (first + rows) last index
  }

}
