import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPage implements OnInit {
  showTermsAndConditions: boolean;
  registerForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    options: this.fb.group({
      hasReadTermsAndConditions: ['']
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  toggleModel(): void {
    this.showTermsAndConditions = !this.showTermsAndConditions;
  }

  onSubmit(): void {
    
  }
}
