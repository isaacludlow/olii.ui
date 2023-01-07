import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from '../models/requests/user/user-request';
import { AuthStore } from '../shared/services/authentication/auth-store';
import { UserStore } from '../shared/services/user/user.store';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { User } from '../models/dto/user/user.dto';
import { ViewWillEnter } from '@ionic/angular';

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
  });

  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private userStore: UserStore,
    private router: Router,
    private location: Location
  ) { }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  toggleModel(): void {
    this.showTermsAndConditions = !this.showTermsAndConditions;
  }

  navigateBack(): void {
    this.location.back();
  }

  async onSubmit(): Promise<void> {
    // const usernameIsAvailable = await this.userStore.checkUsernameAvailability(this.registerForm.get('username').value).toPromise()
    // if (!usernameIsAvailable) {
    //   alert('Username is already taken. Please choose a different username.');
    //   throw new Error('username unavailable');
    // }
    
    const newUser: User = {
      Uid: null,
      Username: this.registerForm.get('username').value,
      Dob: null,
      Email: this.registerForm.get('email').value,
      PhoneNumber: null
    }

    this.authStore.registerUser(newUser.Email, this.registerForm.get('password').value).pipe(
      switchMap(userCredential => {
        newUser.Uid = userCredential.user.uid;
        
        return this.userStore.createUser(newUser)
      })
    ).subscribe(_ => {
      this.registerForm.reset();
      this.router.navigate(['registration/registration-flow']);
    });
  }
}
