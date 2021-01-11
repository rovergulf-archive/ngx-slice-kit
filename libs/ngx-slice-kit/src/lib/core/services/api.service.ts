import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    public get(url: string, params: any = {}, withCredentials = true): Observable<any> {
        return this.makeRequest(`GET`, this.apiUrl + url, params, null, withCredentials);
    }

    public post(url: string, body: any = {}, params: any = {}, withCredentials = true): Observable<any> {
        return this.makeRequest(`POST`, this.apiUrl + url, params, body, withCredentials);
    }

    public put(url: string, body: any = {}, params: any = {}, withCredentials = true): Observable<any> {
        return this.makeRequest(`PUT`, this.apiUrl + url, params, body, withCredentials);
    }

    public patch(url: string, body: any = {}, params: any = {}, withCredentials = true): Observable<any> {
        return this.makeRequest(`PATCH`, this.apiUrl + url, params, body, withCredentials);
    }

    public remove(url: string, params: any = {}, withCredentials = true): Observable<any> {
        return this.makeRequest(`DELETE`, this.apiUrl + url, params, null, withCredentials);
    }

    public makeRequest(method: string, url: string, params?: any, body?: any, withCredentials: boolean = true): Observable<any> {
        return this.http.request(method, url, {
            body, params, withCredentials,
            reportProgress: true
        }).pipe(
            map(res => {
                console.log(`ApiService:${method}:Success at ${url}`); // , res.data);
                return res;
            }),
            catchError(err => {
                console.error(`ApiService:${method}:Error: ${err.error.message || err.message || err.error}`);
                return throwError(err);
            })
        );
    }
}
