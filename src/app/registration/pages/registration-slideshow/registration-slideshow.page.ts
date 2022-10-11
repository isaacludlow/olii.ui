import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/shared/services/authentication/auth-store';
import { NavBarService } from 'src/app/shared/services/nav-bar/nav-bar.service';

@Component({
  templateUrl: './registration-slideshow.page.html',
  styleUrls: ['./registration-slideshow.page.scss']
})
export class RegistrationSlideshowPage implements OnInit {
  slideOptions = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private navBar: NavBarService,
    private authStore: AuthStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.navBar.setNavBarVisibility(false);
  }
}
