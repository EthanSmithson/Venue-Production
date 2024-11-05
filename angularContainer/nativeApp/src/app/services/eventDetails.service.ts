import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class EventDetailsService {

    baseUrl: string = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    getEventDetails(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log(data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/getEventDetails`, formDataJson, {headers: headers}
        );
    }

    saveEvent(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log(data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/saveEvent`, formDataJson, {headers: headers}
        );
    }

    removeEvent(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log(data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/removeEvent`, formDataJson, {headers: headers}
        );
    }

    getSavedEvents(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        // console.log("testing this " + data.myCookie)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getSavedEvents/${data.myCookie}`, {headers: headers}
        );
    }

}