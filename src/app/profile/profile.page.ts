import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FullscreenImageViewerComponent } from '../components/shared/fullscreen-image-viewer/fullscreen-image-viewer.component';
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
  profile$: Observable<Profile>;
  profile: Profile;
  ownProfile: Profile
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
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.profile$ = this.route.queryParamMap.pipe(
      switchMap(paramMap => {
        if (paramMap.has('profileId')) {
          this.profileStore.currentProfile.subscribe(profile => this.ownProfile = profile);

          return this.profileStore.getProfileById(paramMap.get('profileId'));
        } else {
          return this.profileStore.currentProfile.asObservable().pipe(tap(profile => this.ownProfile = profile));
        }
      })
    ).pipe(tap(profile => this.profile = profile));

    this.segmentToShow = this.profileStore.profileSection;
    this.route.queryParamMap.subscribe(paramMap => this.showBackButton = paramMap.get('showBackButton') === 'true');
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  navigateBack(): void {
    this.location.back();
  }

  navigateToSettingsPage(): void {
    this.router.navigate(['./settings']);
  }

  isOwnProfile() {
    return this.ownProfile.ProfileId === this.profile.ProfileId;
  }

  // viewControl(): void {
  //   // TODO: Meant to control the view based on whether you are viewing 
  //   // your own profile or someone elses.  Will have to change the
  //   // logic in the future to compare userIds
  //     this.isOwnProfile = !this.isOwnProfile;
  //     this.segmentToShow = (this.isOwnProfile == false ? "photos" : "photos");
  // }

  followUser(): void {
    // TODO: Send an api update to the database to follow this user
  }

  async openImageViewer(imageIndex: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: FullscreenImageViewerComponent,
      componentProps: {
        imageUrls: this.profile.ImageUrls,
        startingIndex: imageIndex
      }
    });

    modal.present();
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
