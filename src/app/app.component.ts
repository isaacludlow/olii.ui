import { Component, OnInit } from '@angular/core';
import { NavBarService } from './shared/services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  hideNavBar: boolean;

  constructor(private navBar: NavBarService) {}

  ngOnInit(): void {
    this.navBar.navBarVisibility.subscribe(currentVisibility => this.hideNavBar = !currentVisibility);
  }
}
