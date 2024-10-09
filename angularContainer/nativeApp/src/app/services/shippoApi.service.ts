import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';
import { ObjectResults, Shippo } from 'shippo';


@Injectable({
    providedIn: 'root'
})
export class ShippoApiService {

    private shippo: any;
    baseUrl: string = "http://localhost:8080";

    constructor(private http: HttpClient) { 

        this.shippo = new Shippo({
            apiKeyHeader: "ShippoToken shippo_test_8041da9b8ae9faf625afe7c0af782591be142fea",
            shippoApiVersion: "2018-02-08",
          });

        // this.shippo = new Shippo('shippo_test_8041da9b8ae9faf625afe7c0af782591be142fea');

    }

    createOrder(shipmentData: any): Promise<any> {
        return this.shippo.orders.create();
      }

      trackOrder(): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        // console.log(formData)
        const formData = {
          "carrier": "shippo",
          "trackingNumber": "SHIPPO_TRANSIT"
        }
        const formDataJson = JSON.stringify(formData);
        return this.http.post<any>(
            this.baseUrl + `/api/users/trackMyPackages`, formDataJson, {headers: headers}
        ); 
        // return this.http.get<any>(
        //   `https://api.goshippo.com/tracks/shippo/SHIPPO_TRANSIT`, {headers: headers}
        // )
        // return this.shippo.trackingStatus.get("SHIPPO_TRANSIT", "shippo");
    }

}