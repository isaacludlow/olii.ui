import { Component } from '@angular/core';

@Component({
  templateUrl: './registration-slideshow.page.html',
  styleUrls: ['./registration-slideshow.page.scss']
})
export class RegistrationSlideshowPage {
  slideOptions = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

}
