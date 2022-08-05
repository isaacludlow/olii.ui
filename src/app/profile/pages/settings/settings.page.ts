import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/authentication/firebase-auth.service';

@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  profileId: number;

  constructor(private authService: FirebaseAuthService, private router: Router) { }

  ngOnInit(): void {
      // TODO-L36: Use the userStore for profile settings properties.
      // this.profileId = +this.authService.userCredentials.user.displayName;
      this.profileId = 98 // Hard coding right now until displayName is populated with the profileId.
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['registration/slideshow'])
  }
}
