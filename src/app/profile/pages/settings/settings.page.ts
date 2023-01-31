import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/shared/services/authentication/auth-store';
import { NavBarService } from 'src/app/shared/services/nav-bar/nav-bar.service';

@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  constructor(
    private authStore: AuthStore,
    private navbar: NavBarService,
    private router: Router,
    private location: Location
  ) { }

  navigateBack() {
    this.location.back();
  }

  async signOut(): Promise<void> {
    await this.authStore.signOut();
    this.navbar.setNavBarVisibility(false);
    this.router.navigate(['registration/slideshow'])
  }
}
