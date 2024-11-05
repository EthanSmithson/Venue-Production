import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonButton, IonIcon, IonMenu, IonMenuToggle } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FindEvents } from 'src/app/services/findEvents.service';
import { inject } from '@angular/core';
import { heart } from 'ionicons/icons';
import { addIcons } from 'ionicons'; 
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { Router } from '@angular/router';
import { UiUxService } from 'src/app/services/UiUx.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonButton, IonIcon, IonMenu, IonMenuToggle]
})
export class VenuePage implements OnInit {

  private FindEvents = inject(FindEvents);
  private EventsDetails = inject(EventDetailsService);
  private UiUxService = inject(UiUxService);
  eventsList: any;
  eventDetails: any;
  venueId: any;
  eventId: any;
  activatedBtn: any;
  
  constructor(private route: ActivatedRoute, private router: Router,  private cookieService: CookieService) { }

  ngOnInit() {
    addIcons({ heart })
    this.activatedBtn = []

    this.venueId = this.route.snapshot.queryParams['venueId']

    this.FindEvents.getVenuesEvents({"venueId": this.venueId}).subscribe((results: any) => {
      console.log(results)
      this.eventsList = results.venueEvents;
    });

    this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.EventsDetails.getSavedEvents({ "myCookie": results.userId }).subscribe((results: any) => {
        console.log(results)
        for (let i = 0; i < results.length; i++) {
          console.log(results[i].eventId)
          this.activatedBtn.push(results[i].eventId)
        }
      });
    })



  }

  openEventMenu(eventId: any) {
    this.router.navigate(['/event'], { queryParams: { eventId: eventId } });
  }

  saveEvent(eventId: any) {
    if (this.activatedBtn.includes(eventId)) {
      const index = this.activatedBtn.indexOf(eventId);
      if (index > -1) {
        this.activatedBtn.splice(index, 1);
      }
      // this.activatedBtn.remove(eventId)
      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.removeEvent({"eventId": eventId, "userId": results.userId, "venueId": this.venueId}).subscribe((results: any) => {
          console.log(results)
          // this.eventDetails = results
        });
      })
    } else {
      this.activatedBtn.push(eventId)
      // console.log(this.activatedBtn)
      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.saveEvent({"eventId": eventId, "userId": results.userId, "venueId": this.venueId}).subscribe((results: any) => {
          console.log(results)
          // this.eventDetails = results
        });
      })
    }
  }

}
