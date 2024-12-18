import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OpenMap {

    baseUrl: string = "http://147.182.138.193:8080/";

    constructor(private http: HttpClient) { }

    isOpenMap: boolean;
    latLng: object;

}