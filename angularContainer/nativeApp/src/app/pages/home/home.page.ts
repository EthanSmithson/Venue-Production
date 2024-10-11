import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, IonLabel, IonCol, IonNote, IonText, IonAvatar, IonRippleEffect} from '@ionic/angular/standalone';
import { homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackageCreationForm } from './form/packageCreation.page.form';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AddPackage } from 'src/app/services/addPackage.service';
import { AftershipApiService } from 'src/app/services/AftershipApi.service';
import { inject, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { UiUxService } from 'src/app/services/UiUx.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, ReactiveFormsModule, IonLabel, IonCol, IonNote, IonText, IonAvatar, IonRippleEffect]
})
export class HomePage implements OnInit {

  form: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private renderer: Renderer2) { }

  ngOnInit() {
    addIcons({ homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add })

    this.form = new PackageCreationForm(this.formBuilder).createForm();
    console.log(this.form);

    this.AftershipApiService.trackOrder().subscribe((results: any) => {
          console.log(results);
        })
    
    // let cookieObject["myCookie"] = this.cookieService.get("myCookie")

    this.addPackage.getUserId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      this.addPackage.getPackages(results.userId).subscribe((results: any) => {
        console.log(results);
        this.packages = results;
        console.log(this.packages);
      })
    });

    this.UiUxService.getMe({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.myName = results.firstName;
    })
  }

  @ViewChild("removeLabelInUseError") thisLabelError: any = ElementRef;

  private addPackage = inject(AddPackage);
  private AftershipApiService = inject(AftershipApiService);
  private UiUxService = inject(UiUxService);
  userId: any;
  labelInUseError: any;
  labelCreatedAlert: any;
  packages: any;
  myName: any;

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
        this.addPackage.getSlug(formData).subscribe((results: any) => {
          // console.log(results)
          formData['slug'] = results.slug;
          // console.log(formData);
          if (results.slug != undefined && results.slug != null) {
            this.addPackage.addPackage(formData).subscribe((results: any) => {
              console.log(results);
              if (results.dupe) {
                console.log(this.thisLabelError)
                this.labelInUseError = "Tracking Number is in Use.";
                // this.hideLabelError(this.labelInUseError);
              } else {
                this.AftershipApiService.createTracking(formData).subscribe((results: any) => {
                  console.log(results);
                })
                this.labelCreatedAlert = "Package Added!";
                this.hideLabelAlert(this.labelCreatedAlert);
              }
            })
          }
        })
      }
    })
  }

  removeThisPackage(trackingNumber: any) {
    console.log(trackingNumber);
    this.addPackage.removePackage({"trackingNumber": trackingNumber}).subscribe((results: any) => {
      console.log(results);
    });
  }

  hideLabelAlert(data: any) {
    setTimeout(() => {
      this.labelCreatedAlert = "";
    }, 3000);
  }
  
}
