import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Publication } from '../models/publication.model';
import { GenericService } from './generic.service';
import { PublicationFilter } from '../models/publicationFilter.model';

@Injectable()
export class PublicationService {

    constructor(private genericService: GenericService) { 
    }

    findAll(publicationFilter: PublicationFilter): Observable<any> {
        let params = new HttpParams();
        if (publicationFilter.limit){
            params = params.append('limit', publicationFilter.limit.toString());
        }
        if (publicationFilter.orderType){
            params = params.append('orderType', publicationFilter.orderType);
        }
        if (publicationFilter.exclusiveStartKey){
            params = params.append('exclusiveStartKey', publicationFilter.exclusiveStartKey);
        }
        if (publicationFilter.search){
            params = params.append('search', publicationFilter.search);
        }
        return this.genericService.get("/publication", params);
    }

    findOne(id: string): Observable<any> {
        return this.genericService.get(`/publication/find/${id}`);
    }

    findAllByAuthor(publicationFilter: PublicationFilter) {
        let params = new HttpParams();
        if (publicationFilter.limit){
            params = params.append('limit', publicationFilter.limit.toString());
        }
        if (publicationFilter.orderType){
            params = params.append('orderType', publicationFilter.orderType);
        }
        if (publicationFilter.exclusiveStartKey){
            params = params.append('exclusiveStartKey', publicationFilter.exclusiveStartKey);
        }
        if (publicationFilter.search){
            params = params.append('search', publicationFilter.search);
        }
        return this.genericService.get(`/publication/author/${publicationFilter.authorId}`, params);
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
