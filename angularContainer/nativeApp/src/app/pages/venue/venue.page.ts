import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FindEvents } from 'src/app/services/findEvents.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButtons, IonBackButton]
})
export class VenuePage implements OnInit {

  private FindEvents = inject(FindEvents);
  eventsList: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  //  console.log(this.route.snapshot.queryParams['venueId']) 
    this.FindEvents.getVenuesEvents({"venueId": this.route.snapshot.queryParams['venueId']}).subscribe((results: any) => {
      console.log(results)
      this.eventsList = results.venueEvents;
    });



  }

}
