import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { AutocompleteResponseFields, AutocompleteResponseTypes } from 'src/app/models/dto/google-maps/autocomplete-types.dto';

@Component({
  templateUrl: './registration-flow.page.html',
  styleUrls: ['./registration-flow.page.scss']
})
export class RegistrationFlowPage {
  @ViewChild('slider') slides: IonSlides;
  slideOptions = { initialSlide: 0, speed: 400, allowTouchMove: false };
  registerFlowForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    hostCity: [''],
    hostCountry: [''],
    homeCountry: ['']
  });

  constructor(private fb: FormBuilder) { }

  nextSlide(): void {
    this.slides.slideNext();
  }

  previousSlide(): void {
    this.slides.slidePrev();
  }

  submit() {

  }
}
