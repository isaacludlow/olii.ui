import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationRequest } from '../models/requests/registration/user-registration-request';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { NavBarService } from '../shared/services/nav-bar/nav-bar.service';
import { RegistrationService } from '../shared/services/registration.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPage implements OnInit {
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
  });

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private navBar: NavBarService
  ) { }

  ngOnInit(): void {
    this.navBar.setNavBarVisibility(false);
  }

  toggleModel(): void {
    this.showTermsAndConditions = !this.showTermsAndConditions;
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
