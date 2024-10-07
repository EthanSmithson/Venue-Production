import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AddPackage {

    baseUrl: string = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    getUserId(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getId/${formData.myCookie}`, {headers: headers}
        );
    }

    addPackage(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.post<any>(
            this.baseUrl + `/api/users/createPackage`, formDataJson, {headers: headers}
        ); 
    }

    getPackages(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getMyPackages/${formData}`, {headers: headers}
        );
    }

}