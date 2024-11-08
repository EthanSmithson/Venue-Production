import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonBackButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonImg, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonIcon ]
})
export class EventPage implements OnInit {

  private EventsDetails = inject(EventDetailsService);
  eventDetails: any
  eventName: String;
  eventImages: String;
  eventStartDate: String;
  eventStartTime: String;
  eventTickets: String;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    addIcons({ heart })
    
    this.EventsDetails.getEventDetails({"eventId": this.route.snapshot.queryParams['eventId']}).subscribe((results: any) => {
      console.log(results);
      this.eventDetails = results.venueEvents[0];
      console.log(this.eventDetails);
      this.eventName = this.eventDetails.name;
      this.eventImages = this.eventDetails.images[0].url;
      this.eventTickets = this.eventDetails.url;
    });

  }

  redirectToTickets(redirectLink: any) {
    console.log(redirectLink)
    window.location.href = redirectLink;
  }

}
