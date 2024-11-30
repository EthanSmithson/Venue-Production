import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    baseUrl: string = "http://localhost:8080/api/users";

    constructor(private http: HttpClient) { }

    getProfileData(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.get<UserInfo>(
            this.baseUrl + `/getProfileData/${formData.userId}`, {headers: headers}
        ); 
    }

}