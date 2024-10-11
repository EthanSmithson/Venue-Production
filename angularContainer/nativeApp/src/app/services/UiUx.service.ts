import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class UiUxService {

    baseUrl: string = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    getMe(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        return this.http.get<any>(
            this.baseUrl + `/api/users/getMe/${formData.myCookie}`, {headers: headers}
        ); 
    }

}