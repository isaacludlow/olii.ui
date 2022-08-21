import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from '../models/requests/user/user-request';
import { AuthStore } from '../shared/services/authentication/auth-store';
import { UserStore } from '../shared/services/user/user.store';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

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
    private authStore: AuthStore,
    private userStore: UserStore,
    private router: Router,
    private location: Location
  ) { }

  toggleModel(): void {
    this.showTermsAndConditions = !this.showTermsAndConditions;
  }

  navigateBack(): void {
    this.location.back();
  }

  async onSubmit(): Promise<void> {
    const fakeDob = new Date();

    const newUser: UserRequest = {
      Username: this.registerForm.get('username').value,
      DOB: `${fakeDob.getFullYear()}/${fakeDob.getMonth() +1 }/${fakeDob.getDate()}`,
      Email: this.registerForm.get('email').value,
      PhoneNumber: ''
    }

    this.authStore.registerUser(newUser.Email, this.registerForm.get('password').value).pipe(
      switchMap(userCredential => from(userCredential.user.getIdToken())),
      switchMap(userIdToken => this.userStore.createUser(newUser, userIdToken))
    ).subscribe(_ => {
      this.registerForm.reset();
      this.router.navigate(['registration/registration-flow']);
    });
  }
}
