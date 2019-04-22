import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Publication } from 'src/app/models/publication.model';
import { PublicationFilter } from 'src/app/models/publicationFilter.model';
import { Subject } from 'rxjs';
import { GlobalStateEnum } from 'src/app/store/models/globalState.enum';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadListPublications, UpdatePublicationFilterAndReloadPublications } from 'src/app/store/actions/publication.actions';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  publications: Array<Publication>;
  publicationFilter: PublicationFilter;
  ordersType: Array<SelectItem>;

  private ngUnsubscribe: Subject<void>;

  constructor(private store: Store<State>) { 
    this.ngUnsubscribe = new Subject();
    this.publicationFilter = new PublicationFilter();
    this.ordersType = [
      {label: 'Ascending', value: 'asc', icon: 'pi pi-angle-up'},
      {label: 'Descending', value: 'desc', icon: 'pi pi-angle-down'}
  ];
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [])
    });
    this.searchForm.get("search").valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(search => this.searchChange(search));
    this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.PUBLICATION_LIST, GlobalStateEnum.LIST)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(publications => this.publications = publications);
    this.store.select(GlobalStateEnum.GLOBAL, GlobalStateEnum.PUBLICATION_LIST, GlobalStateEnum.FILTERS)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(publicationFilter => this.getPublicationFilterOK(publicationFilter));
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  searchChange(search) {
    this.publicationFilter.search = search;
    this.store.dispatch(new UpdatePublicationFilterAndReloadPublications(this.publicationFilter));
  }

  getPublicationFilterOK(publicationFilter){
    this.publicationFilter = publicationFilter;
  }

  loadAuthorsLazy(event){
    let pos = (event.target.scrollTop || event.target.scrollTop) + event.target.offsetHeight;
    let max = event.target.scrollHeight-100;
    if(pos > max && this.publicationFilter.exclusiveStartKey != null)   {
      this.store.dispatch(new LoadListPublications());
    }
  }

  onOrdersTypeChange(event){
    this.store.dispatch(new UpdatePublicationFilterAndReloadPublications(this.publicationFilter));
  }

  removeAuthorFilter() {
    this.publicationFilter.author = null;
    this.store.dispatch(new UpdatePublicationFilterAndReloadPublications(this.publicationFilter));
  }

}
