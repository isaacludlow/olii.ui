import { HttpClient, HttpParams } from '@angular/common/http';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { CreatePostRequest } from 'src/app/models/requests/community/groups/create-post-request';
import { GroupPostCommentRequest } from 'src/app/models/requests/community/groups/group-post-comment-request';
import { GroupPostComment } from 'src/app/models/dto/community/groups/group-post-comment.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SubSink } from "subsink";
import { AuthStore } from '../../authentication/auth-store';
import { ProfileStore } from '../../profile/profile.store';
import { environment } from 'src/environments/environment';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';

@Injectable({
    providedIn: 'root'
})

export class GroupFeatureService {

	currentUserProfile: Profile;
    private subs = new SubSink()

    dummyId = 32;

    constructor(
        private httpClient:HttpClient,
        private profileStore: ProfileStore,
        private authStore: AuthStore
    ) {
        this.currentUserProfile = this.profileStore.currentUserProfile;
    }

    ExampleGroups:Group[] = [
        {
            GroupId: 1,
            CoverImageUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80%27',
            Name: 'World Exchangers',
            Description: 'If you enjoy partying and want to keep up to date with all that\'s going down here in Switzerland, this is the spot for you',
            PrivacyLevel: PrivacyLevel.Public,
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
            GroupId: 2,
            CoverImageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Party Hard',
            Description: 'This group is public',
            PrivacyLevel: PrivacyLevel.Public,
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
                    Id: 27,
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
                    Id: 28,
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
            GroupId: 3,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Riverside Eventhub',
            Description: 'This group is private',
            PrivacyLevel: PrivacyLevel.Private,
            Posts: [
                {
                    Id: 21000,
                    Author: {
                        Id: 102,
                        FirstName: 'Mark',
                        LastName: 'Rober',
                        ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                    },
                    Content: "Messaging in a private group B)",
                    Date: new Date(Date.UTC(2021, 5, 20, 12, 44, 20)),
                    ImageUrls: [],
                    Comments: [],
                },
            ],
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
            GroupId: 4,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Kekw',
            Description: 'This group is private',
            PrivacyLevel: PrivacyLevel.Private,
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
            GroupId: 5,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Kekw',
            Description: 'This group is public',
            PrivacyLevel: PrivacyLevel.Public,
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

    getGroups(offset: number, limit: number): Observable<Group[]> {
        const params = new HttpParams();
        
        if (offset !== null) params.set('offset', offset);
        if (limit !== null) params.set('limit', limit);
        
        const response = this.httpClient.get<Group[]>(`${environment.apiBaseUrl}/group`, {
            params: params,
            headers: { Authorization: this.authStore.userIdToken }
        });
        
        return response;
    }

    getGroupById(groupId: number): Observable<Group> {
        const response = this.httpClient.get<Group>(`${environment.apiBaseUrl}/group/${groupId}`, {
            headers: { Authorization: this.authStore.userIdToken }
        });
          
        return response;
    }

    getMyGroups(profileId: number): Observable<Group[]> {
        const response = this.httpClient.get<Group[]>(`${environment.apiBaseUrl}/group`, {
            params: { profileId: profileId },
            headers: { Authorization: this.authStore.userIdToken }
        });
          
        return response;
    }

    createGroup(creatorProfileId: number, groupRequest: GroupRequest): Observable<Group> {
        const response = this.httpClient.post<Group>(`${environment.apiBaseUrl}/group`, groupRequest, {
            params: { CreatorProfileId: creatorProfileId },
            headers: { Authorization: this.authStore.userIdToken }
        });
          
        return response;
    }

    updateGroup(updatedGroupRequest: GroupRequest): Observable<Group> {
        const response = this.httpClient.put<Group>(`${environment.apiBaseUrl}/group/${updatedGroupRequest.GroupId}`, updatedGroupRequest, {
            headers: { Authorization: this.authStore.userIdToken }
        });
          
        return response;
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

        this.ExampleGroups.find(group => group.GroupId == newPostRequest.Group).Posts.push(newPost);
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

        this.ExampleGroups.find(group => group.GroupId == newCommentRequest.OriginGroup).Posts.find(post => post.Id == newCommentRequest.ParentId).Comments.push(newComment);
        this.dummyId++;

        return of(true);
    }
}