import { HttpClient } from '@angular/common/http';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { from, Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { CreateGroupRequest } from 'src/app/models/requests/community/groups/create-group-request';
import { CreatePostRequest } from 'src/app/models/requests/community/groups/create-post-request';
import { GroupPostCommentRequest } from 'src/app/models/requests/community/groups/group-post-comment-request';
import { GroupPostComment } from 'src/app/models/dto/community/groups/group-post-comment.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SubSink } from "subsink";
import { AuthStore } from '../../authentication/auth-store';
import { switchMap, tap } from "rxjs/operators"
import { ProfileService } from '../../profile/profile.service';

@Injectable({
    providedIn: 'root'
})

export class GroupService {

	currentUserProfile: Profile;
    private subs = new SubSink()

    dummyId = 32;

    constructor(
        private httpClient:HttpClient,
        private profileService: ProfileService,
        private authStore: AuthStore,
        ) {
        this.subs.sink = this.authStore.user.pipe(
			switchMap(user => this.profileService.getProfileByUserId(user.Id))
		).subscribe(profile => this.currentUserProfile = profile);
    }

    ExampleGroups:Group[] = [
        {
            Id: 1,
            CoverImageUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80%27',
            Name: 'World Exchangers',
            Description: 'If you enjoy partying and want to keep up to date with all that\'s going down here in Switzerland, this is the spot for you',
            PrivacyLevel: "Public",
            Posts: [
                {
                    Id: 25,
                    Author: {
                      Id: 98,
                      FirstName: 'John',
                      LastName: 'Doe',
                      ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
                    },
                    Content: "Hey, anyone have any news on how things are looking with covid and the upcoming Post concert?",
                    Date: new Date(Date.UTC(2021, 5, 20, 12, 44, 20)),
                    ImageUrls: [],
                    Comments: [
                        {
                            Id: 1000,
                            ParentId: 25,
                            Author: {
                                Id: 99,
                                FirstName: 'Steven',
                                LastName: 'Jobs',
                                ProfilePictureUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
                            },
                            Content: "Haven't heard anything back yet, I'll let you know",
                            Date: new Date(Date.UTC(2022, 3, 2, 12, 44, 20))
                        }
                    ],
                },
                {
                    Id: 27,
                    Author: {
                      Id: 98,
                      FirstName: 'John',
                      LastName: 'Doe',
                      ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
                    },
                    Content: "",
                    Date: new Date(Date.UTC(2021, 3, 2, 12, 44, 20)),
                    ImageUrls: ['https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80'],
                    Comments: [],
                },
                {
                    Id: 26,
                    Author: {
                      Id: 99,
                      FirstName: 'Steven',
                      LastName: 'Jobs',
                      ProfilePictureUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
                    },
                    Content: "Check it out B)",
                    Date: new Date(Date.UTC(2021, 4, 17, 12, 44, 20)),
                    ImageUrls: ['https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                                "https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
                    Comments: [],
                },
            ],
            Admins: [
                {
                    Id: 98,
                    FirstName: 'John',
                    LastName: 'Doe',
                    ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
                },
            ],
            Members: [
              {
                Id: 99,
                FirstName: 'Steven',
                LastName: 'Jobs',
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
              },
              {
                Id: 102,
                FirstName: 'Mark',
                LastName: 'Rober',
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
              },
              {
                Id: 152,
                FirstName: 'Jim',
                LastName: 'Browning',
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
              },
            ],
        },

        {
            Id: 2,
            CoverImageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Party Hard',
            Description: 'This group is friends-only',
            PrivacyLevel: "Friends-Only",
            Posts: [
                {
                    Id: 26,
                    Author: {
                        Id: 102,
                        FirstName: 'Mark',
                        LastName: 'Rober',
                        ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                    },
                    Content: "Check it out B)",
                    Date: new Date(Date.UTC(2021, 3, 15, 12, 44, 20)),
                    ImageUrls: ['https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',],
                    Comments: [],
                },
                {
                    Id: 26,
                    Author: {
                        Id: 102,
                        FirstName: 'Mark',
                        LastName: 'Rober',
                        ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                    },
                    Content: "This is a great post",
                    Date: new Date(Date.UTC(2021, 5, 20, 12, 44, 20)),
                    ImageUrls: [],
                    Comments: [],
                },
                {
                    Id: 26,
                    Author: {
                        Id: 102,
                        FirstName: 'Mark',
                        LastName: 'Rober',
                        ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                    },
                    Content: "Check it out B)",
                    Date: new Date(Date.UTC(2021, 5, 20, 12, 44, 20)),
                    ImageUrls: ['https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                                "https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
                    Comments: [],
                },
            ],
            Admins: [
                {
                    Id: 102,
                    FirstName: 'Mark',
                    LastName: 'Rober',
                    ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                },
            ],
            Members: [],
        },

        {
            Id: 3,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Riverside Eventhub',
            Description: 'This group is invite-only',
            PrivacyLevel: "Invite-Only",
            Posts: [],
            Admins: [
                {
                    Id: 152,
                    FirstName: 'Jim',
                    LastName: 'Browning',
                    ProfilePictureUrl: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                  },
            ],
            Members: [],
        },

        {
            Id: 4,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Kekw',
            Description: 'This group is friends-only',
            PrivacyLevel: "Friends-Only",
            Posts: [],
            Admins: [
                {
                    Id: 102,
                    FirstName: 'Mark',
                    LastName: 'Rober',
                    ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                },
            ],
            Members: [],
        },

        {
            Id: 5,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Kekw',
            Description: 'This group is invite-only',
            PrivacyLevel: "Invite-Only",
            Posts: [],
            Admins: [
                {
                    Id: 152,
                    FirstName: 'Jim',
                    LastName: 'Browning',
                    ProfilePictureUrl: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                },
            ],
            Members: [],
        }
    ];

    createGroup(newGroupInfo: CreateGroupRequest): Observable<Group> {
        // TODO: We'll need to actually create a group in the database and get it back to get the auto-generated id,
        const newGroup: Group = {
            Id: this.dummyId, // 
            CoverImageUrl: newGroupInfo.CoverImageData,
            Name: newGroupInfo.Name,
            Description: newGroupInfo.Description,
            PrivacyLevel: newGroupInfo.PrivacyLevel,
            Posts: [],
            Admins: newGroupInfo.Admins,
            Members: newGroupInfo.Members
        }

        this.ExampleGroups.push(newGroup);
        this.dummyId++;

        return of(newGroup);
    }

    updateGroup(updatedGroup: Group): Observable<Group> {
        const index = this.ExampleGroups.indexOf(this.ExampleGroups.find(group => group.Id === updatedGroup.Id));
        if (index !== -1) {
            this.ExampleGroups[index] = updatedGroup;
        }
        return of(this.ExampleGroups.find(group => group.Id === updatedGroup.Id));
    }

    getGroupAll(): Observable<Group[]> {
        return of(this.ExampleGroups);
    }

    getGroupById(id: number): Observable<Group> {
        return of(this.ExampleGroups.find(group => group.Id === id));
    }

    createGroupPost(newPostRequest: CreatePostRequest):Observable<Boolean> {
        const newPost: GroupPost = {
            Id: this.dummyId,
            Author: {
                Id: this.currentUserProfile.Id,
                FirstName: this.currentUserProfile.FirstName,
                LastName: this.currentUserProfile.LastName,
                ProfilePictureUrl: this.currentUserProfile.ProfilePictureUrl
            },
            Content: newPostRequest.Content,
            Date: newPostRequest.Date,
            ImageUrls: newPostRequest.ImagesData,
            Comments: [],
        }

        this.ExampleGroups.find(group => group.Id == newPostRequest.Group).Posts.push(newPost);
        this.dummyId++;

        return of(true);
    }

    addCommentToGroupPost(newCommentRequest: GroupPostCommentRequest):Observable<Boolean> {
        const newComment: GroupPostComment = {
            Id: this.dummyId,
            ParentId: newCommentRequest.ParentId,
            Author: newCommentRequest.Author,
            Content: newCommentRequest.Content,
            Date: newCommentRequest.Date
        }

        this.ExampleGroups.find(group => group.Id == newCommentRequest.OriginGroup).Posts.find(post => post.Id == newCommentRequest.ParentId).Comments.push(newComment);
        this.dummyId++;

        return of(true);
    }
}