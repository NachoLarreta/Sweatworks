import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Publication } from '../models/publication.model';
import { GenericService } from './generic.service';

@Injectable()
export class PublicationService {

    constructor(private genericService: GenericService) { 
    }

    findAll(limit?: number, orderType?: string, exclusiveStartKey?: string, search?: string): Observable<any> {
        let params = new HttpParams();
        if (limit){
            params = params.append('limit', limit.toString());
        }
        if (orderType){
            params = params.append('orderType', orderType);
        }
        if (exclusiveStartKey){
            params = params.append('exclusiveStartKey', exclusiveStartKey);
        }
        if (search){
            params = params.append('search', search);
        }
        return this.genericService.get("/publication", params);
    }

    findOne(id: string): Observable<any> {
        return this.genericService.get(`/publication/find/${id}`);
    }

    findAllByAuthor(authorId: string, limit?: number, orderType?: string, exclusiveStartKey?: string, search?: string) {
        let params = new HttpParams();
        if (limit){
            params = params.append('limit', limit.toString());
        }
        if (orderType){
            params = params.append('orderType', orderType);
        }
        if (exclusiveStartKey){
            params = params.append('exclusiveStartKey', exclusiveStartKey);
        }
        if (search){
            params = params.append('search', search);
        }
        return this.genericService.get(`/publication/author/${authorId}`, params);
    }

    delete(id: string): Observable<any> {
        return this.genericService.delete(`/publication/${id}`);
    }

    create(publication: Publication): Observable<any> {
        return this.genericService.post('/publication', publication);
    }

    update(publication: Publication): Observable<any> {
        return this.genericService.put('/publication', publication);
    }

}
