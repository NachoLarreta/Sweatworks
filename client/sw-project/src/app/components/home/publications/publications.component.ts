import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Publication } from 'src/app/models/publication.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';
import { Subject } from 'rxjs';
import { GlobalStateEnum } from 'src/app/store/models/globalState.enum';
import { takeUntil } from 'rxjs/operators';
import { LoadListPublications } from 'src/app/store/actions/publication.actions';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit, OnDestroy {

  publications: Array<Publication>;
  publicationFilter: PublicationFilter;
  orderType: string;
  ordersType: Array<SelectItem>;

  private ngUnsubscribe: Subject<void>;

  constructor(private store: Store<State>) { 
    this.ngUnsubscribe = new Subject();
    this.ordersType = [
      {label: 'Ascending', value: 'asc', icon: 'fa fa-fw fa-angle-up'},
      {label: 'Descending', value: 'desc', icon: 'fa fa-fw fa-angle-down'}
  ];
  }

  ngOnInit() {
    this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.PUBLICATION_LIST, GlobalStateEnum.LIST)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(publications => this.publications = publications);
    this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.PUBLICATION_LIST, GlobalStateEnum.FILTERS)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(publicationFilter => this.publicationFilter = publicationFilter);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadAuthorsLazy(event){
    debugger;
    let pos = (event.target.scrollTop || event.target.scrollTop) + event.target.offsetHeight;
    let max = event.target.scrollHeight-100;
    if(pos > max && this.publicationFilter.exclusiveStartKey != null)   {
      this.store.dispatch(new LoadListPublications());
    }
  }

}
