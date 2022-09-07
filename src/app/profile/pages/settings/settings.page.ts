import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/shared/services/authentication/auth-store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  constructor(
    private authStore: AuthStore,
    private profileStore: ProfileStore,
    private router: Router,
    private location: Location
  ) { }

  navigateBack() {
    this.location.back();
  }

  async signOut(): Promise<void> {
    await this.authStore.signOut();
    this.router.navigate(['registration/slideshow'])
  }
}
