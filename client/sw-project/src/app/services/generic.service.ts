import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GenericService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('X-Api-Key', environment.API_KEY);
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    get(url, params?: HttpParams): Observable<any> {
        url = environment.serverUrl + url;
        if (params){
            return this.http.get(url, {headers: this.headers, params});
        } else {
            return this.http.get(url, {headers: this.headers});
        }
    }

    delete(url): Observable<any> {
        url = environment.serverUrl + url;
        return this.http.delete(url, {headers: this.headers});
    }

    post(url, body): Observable<any>{
        url = environment.serverUrl + url;
        return this.http.post(url, body, {headers: this.headers});
    }

    put(url, body): Observable<any>{
        url = environment.serverUrl + url;
        return this.http.put(url, body, {headers: this.headers});
    }

}