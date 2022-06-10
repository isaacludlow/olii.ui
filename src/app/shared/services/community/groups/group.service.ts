import { HttpClient } from '@angular/common/http';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { from, Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Group } from 'src/app/models/dto/community/groups/group.dto';

@Injectable({
    providedIn: 'root'
})

export class GroupService {

    constructor(private httpClient:HttpClient) {}

    ExampleGroups:Group[] = [
        {
            Id: 1,
            CoverImageUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80%27',
            Name: 'World Exchangers',
            Description: 'If you enjoy partying and want to keep up to date with all that\'s going down here in Switzerland, this is the spot for you',
            PrivacyLevel: "Public",
            Posts: [],
            Admins: [],
            Members: [],
        },

        {
            Id: 2,
            CoverImageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Party Hard',
            Description: 'If you enjoy partying, this is the spot for you',
            PrivacyLevel: "Public",
            Posts: [],
            Admins: [],
            Members: [],
        },

        {
            Id: 3,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Riverside Eventhub',
            Description: 'This is a description',
            PrivacyLevel: "Public",
            Posts: [],
            Admins: [],
            Members: [],
        },

        {
            Id: 4,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Kekw',
            Description: 'This is a description',
            PrivacyLevel: "Public",
            Posts: [],
            Admins: [],
            Members: [],
        },

        {
            Id: 5,
            CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            Name: 'Kekw',
            Description: 'This is a description',
            PrivacyLevel: "Public",
            Posts: [],
            Admins: [],
            Members: [],
        }
    ];

    getGroupAll(): Observable<Group[]> {
        return of(this.ExampleGroups);
    }

    getGroupById(id: number): Observable<Group> {
        return of(this.ExampleGroups.find(group => group.Id === id));
    }
}