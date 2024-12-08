import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonAvatar, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { UiUxService } from './services/UiUx.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, AsyncPipe, HttpClientModule, IonAvatar, IonRippleEffect],
})
export class AppComponent {
  public appPages = [
  ];

  myEmail: String;
  UiUxService = inject(UiUxService);
  cookieService = inject(CookieService)

  constructor(private router: Router) {} 

  ngOnInit() {
    this.myEmail = this.cookieService.get("myCookie");
  }

  navigateProfile() { 
    this.router.navigate(['/settings']);
  }



}