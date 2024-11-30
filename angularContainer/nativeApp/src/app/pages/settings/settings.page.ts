import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ProfileUpdateForm } from './form/settingsProfile.form';
import { ProfileService } from 'src/app/services/profile.service';
import { UiUxService } from 'src/app/services/UiUx.service';
import { CookieService } from 'ngx-cookie-service';
import { restaurant } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, ReactiveFormsModule, IonInput, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonButton]
})
export class SettingsPage implements OnInit {

  form: any = FormGroup;
  ProfileService = inject(ProfileService);
  UiUxService = inject(UiUxService);
  myId: Number;
  firstName: String;
  lastName: String;
  phoneNumber: any;
  email: String;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService) { }

  ngOnInit() {
    this.form = new ProfileUpdateForm(this.formBuilder).createForm();
    console.log(this.form)

    this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.myId = results.userId;
      this.ProfileService.getProfileData({ "userId": this.myId }).subscribe((results) => {
        console.log(results)
        this.firstName = results[0].firstName;
        this.lastName = results[0].lastName;
        this.email = results[0].email;
        this.phoneNumber = results[0].phoneNumber;
      })
    })
 
  }

  submitProfileUpdate(formData: any) {
    console.log(formData);
    
  }

}
