import { Component, Inject, OnInit } from '@angular/core';
import { NavBarService } from './shared/services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  hideNavBar: boolean;

  constructor(private navBarService: NavBarService) {}

  ngOnInit(): void {
    this.navBarService.navBarVisibility.subscribe(currentVisibility => this.hideNavBar = !currentVisibility);
    this.navBarService.setNavBarVisibility(false);
  }
}
