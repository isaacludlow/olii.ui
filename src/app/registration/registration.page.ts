import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationRequest } from '../models/requests/registration/user-registration-request';
import { RegistrationService } from '../shared/services/registration/registration.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPage {
  showTermsAndConditions: boolean;
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    hasReadTermsAndConditions: [false, Validators.requiredTrue]
  },
  { updateOn: 'blur' }
  );

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private location: Location
  ) { }

  toggleModel(): void {
    this.showTermsAndConditions = !this.showTermsAndConditions;
  }

  navigateBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    const userInfo: UserRegistrationRequest = {
      Username: this.registerForm.get('username').value,
      Email: this.registerForm.get('email').value,
      Password: this.registerForm.get('password').value,
      HasReadTermsAndConditions: this.registerForm.get('hasReadTermsAndConditions').value
    }
    
    this.registrationService.registerUser(userInfo).subscribe(_ => {
      this.registerForm.reset();
      this.router.navigate(['registration/registration-flow']);
    });
  }
}
