import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Profile } from '../models/dto/profile/profile.dto';
import { AuthStore } from '../shared/services/authentication/auth-store';
import { ProfileStore } from '../shared/services/profile/profile.store';
import { CreateAlbumPopUpComponent } from './shared/components/create-album-pop-up/create-album-pop-up.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  profile: Profile;
  profilePostUrls: string[];
  segmentToShow: string;
  subs = new SubSink();
  showBackButton: boolean;

  constructor(
    private profileStore: ProfileStore,
    private modalCtrl: ModalController,
    private authStore: AuthStore,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(paramMap => {
        if (paramMap.has('profileId')) {
          return this.profileStore.getProfileById(+paramMap.get('profileId'));
        } else {
          return this.profileStore.currentProfile.asObservable();
        }
      })
    ).subscribe(profile => this.profile = profile);

    this.segmentToShow = this.profileStore.profileSection;
    this.route.queryParamMap.subscribe(paramMap => this.showBackButton = paramMap.get('showBackButton') === 'true');
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  navigateBack() {
    this.location.back();
  }

  isActiveUser() {
    if (this.profile.ProfileId == this.profile?.ProfileId) {
      return true;
    }
    return false;
  }

  // viewControl(): void {
  //   // TODO: Meant to control the view based on whether you are viewing 
  //   // your own profile or someone elses.  Will have to change the
  //   // logic in the future to compare userIds
  //     this.isActiveUser = !this.isActiveUser;
  //     this.segmentToShow = (this.isActiveUser == false ? "photos" : "photos");
  // }

  followUser(): void {
    // TODO: Send an api update to the database to follow this user
  }

  async signOut(): Promise<void> {
    await this.authStore.signOut();
    this.router.navigate(['registration/slideshow']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateAlbumPopUpComponent,
      cssClass: 'create-album-popup-modal'
    });

    return await modal.present();
  }
}
