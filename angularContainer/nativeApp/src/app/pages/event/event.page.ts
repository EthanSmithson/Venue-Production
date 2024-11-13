import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonBackButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { GoogleMapsModule } from "@angular/google-maps";
import { Loader } from "@googlemaps/js-api-loader"
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonImg, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonIcon, GoogleMapsModule ]
})
export class EventPage implements AfterViewInit {

  @ViewChild('mapEl') mapEl!: ElementRef;

  private EventsDetails = inject(EventDetailsService);
  eventDetails: any
  eventName: String;
  eventImages: String;
  eventStartDate: String;
  eventStartTime: String;
  eventTickets: String;
  LatLng: any;
  
  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit() {

    let loader = new Loader({
      apiKey: 'AIzaSyD4AJX7dsVR4DkYHUP-J3exqx9c4Q4ucL8',
      version: "weekly"
    })

    addIcons({ heart })
    
    this.EventsDetails.getEventDetails({"eventId": this.route.snapshot.queryParams['eventId']}).subscribe((results: any) => {
      console.log(results);
      this.eventDetails = results.venueEvents[0];
      console.log(this.eventDetails);
      this.eventName = this.eventDetails.name;
      this.eventImages = this.eventDetails.images[0].url;
      this.eventTickets = this.eventDetails.url;
      console.log(this.eventDetails._embedded.venues[0].location)
      this.LatLng = { "lat": Number(this.eventDetails._embedded.venues[0].location.latitude), "lng" : Number(this.eventDetails._embedded.venues[0].location.longitude) }
      console.log(this.LatLng)

      loader
        .importLibrary('maps')
        .then(({Map}) => {
          new Map(this.mapEl.nativeElement, {
            center: this.LatLng,
            zoom: 13, 
            styles: [
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "stylers": [
                  {
                    "visibility": "simplified"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              }
            ]
            // mapId: "72dbc0caa69649c6"
          });
        })
        .catch((e) => {
          // do something
      });
      });

  }

  redirectToTickets(redirectLink: any) {
    console.log(redirectLink)
    window.location.href = redirectLink;
  }

}
