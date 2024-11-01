import { Component, OnInit } from '@angular/core';
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
  eventsList: any;
  eventDetails: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    addIcons({ heart })

    this.FindEvents.getVenuesEvents({"venueId": this.route.snapshot.queryParams['venueId']}).subscribe((results: any) => {
      console.log(results)
      this.eventsList = results.venueEvents;
    });

  }

  openEventMenu(eventId: any) {
    // this.EventsDetails.getEventDetails({"eventId": eventId}).subscribe((results: any) => {
    //   console.log(results)
    //   this.eventDetails = results
    // });
    this.router.navigate(['/event'], { queryParams: { eventId: eventId } });
  }

}
