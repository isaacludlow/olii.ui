import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { combineLatest, Observable, zip } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap, tap } from 'rxjs/operators';
import { mapGroup, mapGroups } from 'src/app/shared/services/bankend/mappers';

@Component({
  templateUrl: './my-groups.page.html',
  styleUrls: ['./my-groups.page.scss']
})
export class MyGroupsPage implements OnInit {
  groups$: Observable<Group[]>;

  constructor(
    private afs: AngularFirestore,
    private groupStore: GroupFeatureStore,
    private profileStore: ProfileStore,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.groups$ = this.groupStore.getMyGroups(this.profileStore.currentProfile.value.ProfileId);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
