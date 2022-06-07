import { Component, OnInit } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {

  // TODO: Replace with DTO and a group store

  groups = {
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
