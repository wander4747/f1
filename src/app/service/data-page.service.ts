import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataPageService {

    public data: any;
    constructor() { }

    public setData(data) {
        this.data = data;
    }

    public getData() {
        return this.data;
    }
}
