import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  profileId: number;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
      // this.profileId = +this.authService.userCredentials.user.displayName;
      this.profileId = 98 // Hard coding right now until displayName is populated with the profileId.
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['registration/slideshow'])
  }
}
