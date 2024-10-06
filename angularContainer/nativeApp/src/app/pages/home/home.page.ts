import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput} from '@ionic/angular/standalone';
import { homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Shippo } from 'shippo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackageCreationForm } from './form/packageCreation.page.form';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, ReactiveFormsModule]
})
export class HomePage implements OnInit {

  form: any = FormGroup;

  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    addIcons({ homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add })

    this.form = new PackageCreationForm(this.formBuilder).createForm();
    console.log(this.form);

    const shippo = new Shippo({
      apiKeyHeader: "ShippoToken shippo_live_921650f955b8c539d484477624425c6edc4900d3",
      shippoApiVersion: "2018-02-08",
    });
    
    // async function run() {
    //   const result = await shippo.webhooks.createWebhook({
    //     event: "track_updated",
    //     url: "http://localhost:8080/packageTracking",
    //     active: true,
    //     isTest: false,
    //   });
    
    //   // Handle the result
    //   console.log(result)
    // }
    
    // run();

    async function listWebhooks() {
      const result = await shippo.webhooks.listWebhooks();
    
      // Handle the result
      console.log(result)
    }
    
    listWebhooks();
  }

  submitPackage(formData: any) {
    console.log(formData)
  }

}
