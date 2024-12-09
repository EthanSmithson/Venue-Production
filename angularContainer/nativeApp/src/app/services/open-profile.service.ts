import { EventEmitter, Injectable } from '@angular/core';
import { exit } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class OpenProfileService {

  openedProf =  new EventEmitter<any>();

  constructor() { }

  whichTab: number;

  openingProf(tabNum: number) {
    this.whichTab = tabNum;
    // this.isOpenProf ? this.isOpenProf = false : this.isOpenProf = true;

    
    this.openedProf.emit(this.whichTab);
    // this.isOpenProf = false;
  }

}
