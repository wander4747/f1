import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public url = 'https://ergast.com/api/f1/';

    constructor(public http: HttpClient) { }

    get(endpoint: string, params?: any, reqOpts?: any) {
        return this.http.get(this.url + endpoint + this.randomTime());
    }
    randomTime() {
        return '?time=' + new Date().getTime() + Math.floor((Math.random() * 1000) + 1);
    }
}
