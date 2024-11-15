import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IsSaved {

    baseUrl: string = "http://localhost:8080/";

    constructor(private http: HttpClient) { }

    isSaved: number;
    comingFromPageEvents: boolean;

}