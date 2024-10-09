import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, IonLabel} from '@ionic/angular/standalone';
import { homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Shippo } from 'shippo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackageCreationForm } from './form/packageCreation.page.form';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AddPackage } from 'src/app/services/addPackage.service';
import { ShippoApiService } from 'src/app/services/shippoApi.service';
import { inject, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, ReactiveFormsModule, IonLabel]
})
export class HomePage implements OnInit {

  form: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private renderer: Renderer2) { }

  ngOnInit() {
    addIcons({ homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add })

    this.form = new PackageCreationForm(this.formBuilder).createForm();
    console.log(this.form);

    const shippo = new Shippo({
      apiKeyHeader: "ShippoToken shippo_test_8041da9b8ae9faf625afe7c0af782591be142fea",
      shippoApiVersion: "2018-02-08",
    });

    async function listWebhooks() {
      const result = await shippo.webhooks.listWebhooks();
    
      // Handle the result
      console.log(result)
    }
    
    listWebhooks();

    // async function run() {
    //   const result = await shippo.trackingStatus.get("SHIPPO_TRANSIT", "shippo");
    
    //   // Handle the result
    //   console.log(result)
    // }
    this.shippoApiService.trackOrder().subscribe((results: any) => {
          console.log(results);
        })
    
    // run();

    // let cookieObject["myCookie"] = this.cookieService.get("myCookie")

    this.addPackage.getUserId({myCookie : this.cookieService.get("myCookie")}).subscribe((results: any) => {
      this.addPackage.getPackages(results.userId).subscribe((results: any) => {
        console.log(results);
        this.packages = results;
        console.log(this.packages);
      })
    });
  }

  @ViewChild("removeLabelInUseError") thisLabelError: any = ElementRef;

  private addPackage = inject(AddPackage);
  private shippoApiService = inject(ShippoApiService);
  userId: any;
  labelInUseError: any;
  labelCreatedAlert: any;
  packages: any;

  submitPackage(formData: any) {
    let myCookie = this.cookieService.get("myCookie");
    formData["myCookie"] = myCookie;
    console.log(formData);
    this.addPackage.getUserId(formData).subscribe((results: any) => {
      console.log(results);
      this.userId = results.userId;
      console.log(this.userId);
      if (this.userId != null) {
        formData['userId'] = this.userId;
        this.addPackage.addPackage(formData).subscribe((results: any) => {
          console.log(results);
          if (results.dupe) {
            console.log(this.thisLabelError)
            this.labelInUseError = "Tracking Number is in Use.";
            // this.hideLabelError(this.labelInUseError);
          } else {
            // let createMyPacakge = this.createMyPackage(formData);
            // this.shippoApiService.trackOrder(formData).subscribe((results: any) => {
            //   console.log(results);
            // })
            // let trackMyPackage = this.trackPackage(formData);
            this.labelCreatedAlert = "Package Added!";
            this.hideLabelAlert(this.labelCreatedAlert);
          }
        })
      }
    })
  }

  hideLabelAlert(data: any) {
    setTimeout(() => {
      this.labelCreatedAlert = "";
    }, 3000);
  }

  // trackPackage(data: any) {
  //   this.shippoApiService.trackOrder(data).subscribe((results: any) => {
  //     console.log(results);
  //   })
  // }

  // createMyPackage(data: any) {
  //   // this.shippoApiService.createOrder(data).subscribe((results: any) => {
  //   //   console.log(results);
  //   // })
  //   this.shippoApiService.createOrder(data)
  //     .then(shipment => {
  //       console.log('Shipment created:', shipment);
  //       // return this.shippoApiService.getRates(shipment.object_id);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }

}
