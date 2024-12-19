import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OpenMap {

    baseUrl: string = "http://143.198.115.235:8020/";

    constructor(private http: HttpClient) { }

    isOpenMap: boolean;
    latLng: object;

}