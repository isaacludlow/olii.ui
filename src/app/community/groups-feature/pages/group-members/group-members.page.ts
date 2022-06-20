import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss']
})
export class GroupMembersPage implements OnInit {

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }


  getGroupId() {
    return this.route.snapshot.paramMap.get('groupId')
  }
}
