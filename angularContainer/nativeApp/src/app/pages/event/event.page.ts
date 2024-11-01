import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventPage implements OnInit {

  private EventsDetails = inject(EventDetailsService);
  eventDetails: any
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.EventsDetails.getEventDetails({"eventId": this.route.snapshot.queryParams['eventId']}).subscribe((results: any) => {
      console.log(results)
      this.eventDetails = results
    });

  }

}
