import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    baseUrl: string = "http://143.198.115.235:8020";
    mySqlURL: string = "http://143.198.115.235:8020/api/users";

    constructor(private http: HttpClient) { }

    checkUserExists(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.get<UserInfo>(
            this.mySqlURL + `/find/${formData.email}`, {headers: headers}
        ); 
    }

    registerUser(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.post<UserInfo>(
            this.mySqlURL + '/register', formDataJson, {headers: headers}
        );
    }

    sendEmailConfirm(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.post<UserInfo>(
            this.baseUrl + '/confirmEmail', formDataJson, {headers: headers}
        );
    }

}