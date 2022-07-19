import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { Profile } from '../models/dto/profile/profile.dto';
import { FirebaseAuthService } from '../shared/services/authentication/firebase-auth.service';
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
  // TODO: We probably don't want to default this to true...
  isActiveUser = true;

  constructor(
    private profileStore: ProfileStore,
    private modalCtrl: ModalController,
    private authService: FirebaseAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
    this.segmentToShow = this.profileStore.profileSection;
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  viewControl(): void {
    // TODO: Meant to control the view based on whether you are viewing 
    // your own profile or someone elses.  Will have to change the
    // logic in the future to compare userIds
      this.isActiveUser = !this.isActiveUser;
      this.segmentToShow = (this.isActiveUser == false ? "photos" : "photos");
  }

  followUser(): void {
    // TODO: Send an api update to the database to follow this user
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
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
