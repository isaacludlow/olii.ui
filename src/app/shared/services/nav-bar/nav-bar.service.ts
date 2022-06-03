import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  navBarVisibility = new BehaviorSubject<boolean>(true);

  get navBarVisibilityValue(): boolean {
    return this.navBarVisibility.value;
  }

  setNavBarVisibility(visibility: boolean): void {
    this.navBarVisibility.next(visibility);
  }
}
