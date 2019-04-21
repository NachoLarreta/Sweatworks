import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Author } from '../models/author.model';
import { GenericService } from './generic.service';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { AuthorFilter } from '../models/authorFilter.model';

@Injectable()
export class AuthorService {
    
    constructor(private genericService: GenericService) { 
    }

    findAll(authorFilter: AuthorFilter): Observable<any> {
        let params = new HttpParams();
        if (authorFilter.limit){
            params = params.append('limit', authorFilter.limit.toString());
        }
        if (authorFilter.exclusiveStartKey){
            params = params.append('exclusiveStartKey', authorFilter.exclusiveStartKey);
        }
        return this.genericService.get("/author", params);
    }

    findOne(id: string): Observable<any> {
        return this.genericService.get(`/author/${id}`);
    }

    delete(id: string): Observable<any> {
        return this.genericService.delete(`/author/${id}`);
    }

    create(author: Author): Observable<any> {
        return this.genericService.post('/author', author);
    }

    update(author: Author): Observable<any> {
        return this.genericService.put('/author', author);
    }

}