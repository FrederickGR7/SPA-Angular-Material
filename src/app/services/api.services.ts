import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = 'localhost:3000';
const auth = '';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private options(body: any) {
        if (body instanceof FormData) {
            return {};
        }
        return { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    }

    constructor(private httpClient: HttpClient) { }

    public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
            let url = '';
            if (path.includes('menu')){
            url = auth + 'api/';
        }
        else {
            url = BASE_URL;
        }
            return this.httpClient.get(url + path, { params }).pipe(catchError(this.formatErrors));
    }

    public put(path: string, body: object = {}): Observable<any> {
        return this.httpClient
            .put(BASE_URL + path, JSON.stringify(body), this.options(body))
            .pipe(catchError(this.formatErrors));
    }

    public post(path: string, body: any = {}): Observable<any> {
        let url = '';
        if (path.includes('connect/token')){
               url = auth;
        }
        else{
            url = BASE_URL;
        }
        if (body instanceof FormData) {
            return this.httpClient
                .post(auth + path, body, this.options(body))
                .pipe(catchError(this.formatErrors));
        }
        if (typeof (body) === 'string') {
            return this.httpClient
                .post(url + path, JSON.stringify(body), this.options(body))
                .pipe(catchError(this.formatErrors));
        }

        return this.httpClient
            .post(BASE_URL + path, JSON.stringify(body), this.options(body))
            .pipe(catchError(this.formatErrors));
    }

    public delete(path: string): Observable<any> {
        return this.httpClient.delete(BASE_URL + path).pipe(catchError(this.formatErrors));
    }

    public formatErrors(error: any): Observable<any> {
        return throwError(error.error);
    }
}
