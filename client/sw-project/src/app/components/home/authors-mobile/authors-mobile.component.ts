import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Subject } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'authors-mobile',
  templateUrl: './authors-mobile.component.html',
  styleUrls: ['./authors-mobile.component.scss']
})
export class AuthorsMobileComponent implements OnInit {

  authors: Array<Author>;

  private ngUnsubscribe: Subject<void>;

  constructor(private store: Store<State>) { 
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.select("global", "listAuthors").pipe(takeUntil(this.ngUnsubscribe)).subscribe(authors => this.authors = authors );
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
