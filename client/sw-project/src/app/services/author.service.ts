import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Author } from '../models/author.model';
import { GenericService } from './generic.service';

@Injectable()
export class AuthorService {

    constructor(private genericService: GenericService) { 
    }

    findAll(limit?: number, exclusiveStartKey?: string): Observable<any> {
        let params = new HttpParams();
        if (limit){
            params = params.append('limit', limit.toString());
        }
        if (exclusiveStartKey){
            params = params.append('exclusiveStartKey', exclusiveStartKey);
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
