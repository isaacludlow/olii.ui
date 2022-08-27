import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities'
import { PrivacyLevelRequest } from 'src/app/models/requests/misc/privacy-level-request.do';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { GroupFeatureService } from 'src/app/shared/services/community/groups-feature/group-feature.service';

@Component({
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss']
})
export class EditGroupPage implements OnInit {

  group: Group;
  groupPicture: GalleryPhoto;
  subs = new SubSink();

  editGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    groupVisibility: [null, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private groupStore: GroupFeatureStore,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
    this.editGroupForm.get('groupVisibility').setValue(this.group.PrivacyLevel);
    this.groupPicture = <GalleryPhoto>{ webPath: this.group.CoverImageUrl };
    this.editGroupForm.controls['name'].setValue(this.group.Name);
    this.editGroupForm.controls['description'].setValue(this.group.Description);
  }

  setGroupPicture() {
    selectImages(1).subscribe(galleryPhotos => this.groupPicture = galleryPhotos.shift());
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async updateGroup() {
    
    const updatedGroup: GroupRequest = {
      Id: this.group.Id,
      CoverImageData: await readPhotoAsBase64(this.groupPicture, this.platform),
      Name: this.editGroupForm.get('name').value,
      Description: this.editGroupForm.get('description').value,
      PrivacyLevel: this.editGroupForm.get('groupVisibility').value as PrivacyLevelRequest,
      Admin: null,
    }
  
    this.groupStore.updateGroup(updatedGroup).subscribe(res => {
      this.router.navigate(['community/groups/group/' + res.Id]);
    })
  }

}
