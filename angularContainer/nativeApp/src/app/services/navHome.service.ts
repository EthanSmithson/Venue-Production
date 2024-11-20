import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class NavHome {

    baseUrl: string = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    navHome: boolean;

}