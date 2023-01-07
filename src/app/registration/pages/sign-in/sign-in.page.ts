import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/shared/services/authentication/auth-store';
import { NavBarService } from 'src/app/shared/services/nav-bar/nav-bar.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss']
})
export class SignInPage {
  signInForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private router: Router,
    private location: Location,
    private navBar: NavBarService,
  ) { }

  get email() {
    return this.signInForm.get('email');
  }

  onSubmit(): void {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.authStore.login(email, password).subscribe(_ => {
      this.signInForm.reset();
      this.navBar.setNavBarVisibility(true);
      this.router.navigate(['community/events']);
    });
  }

  navigateBack(): void {
    this.location.back()
  }
}
