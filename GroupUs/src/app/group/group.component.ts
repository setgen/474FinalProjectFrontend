import { Component, OnInit } from '@angular/core';
import { Group } from '../models/Group';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  service: ApiService
  userData: any;
  groupData: any;

  id:string;
  g:Group;

  users:User[];
  events:Event[];

  canEdit:boolean;
  errorDetected:boolean;


  constructor(private s: ApiService, private route: ActivatedRoute) {
    this.service = s;
    this.id = this.route.snapshot.paramMap.get('id');

    this.userData = null;
    this.groupData = null;
    this.g = null;
    this.events = [];
    this.canEdit = false;

    this.retrieveGroups(this.service);
  }

  ngOnInit() {
  }

  retrieveGroups(service: ApiService) {
    service.getGroups().subscribe(
      data => { this.groupData = data; },
      err => { console.error(err); this.errorDetected = true; },
      () => {
        console.log('done loading groups');
        console.log(this.groupData);
        this.getGroupInfo();
        this.retrieveUsers(service);
      }
    )
  }

  getGroupInfo() {
    for (let group of this.groupData) {
      if(group._id === this.id) {
        let newg = new Group();
        newg.groupName = group.groupName;
        newg.members = group.members;
        newg.events = group.events;

        this.g = newg;
        this.canEdit = this.service.getCurrUser() && this.currUserInGroup(this.g);
      }
    };
  }

  currUserInGroup(gr:Group):boolean {
    let found = false;
    let u:User = this.service.getCurrUser();
    for (let m of gr.members) {
      if (m === u.username) {
        found = true;
      }
    }
    return found;
  }

  retrieveUsers(service: ApiService) {
    service.getUsers().subscribe(
      data => { this.userData = data; },
      err => { console.error(err); this.errorDetected = true; },
      () => { 
        console.log('done loading users'); 
        console.log(this.userData);
        this.getUserInfo();
      }
    );
  }

  getUserInfo() {
    this.users = [];
    for (let user of this.userData) {
      for (let m of this.g.members) {
        if(m === user.username) {
          let newu = new User();
          newu.firstName = user.firstName;
          newu.lastName = user.lastName;
          newu.username = user.username;
          newu.password = user.password;
          newu.bio = user.bio;
          newu.id = user._id;
          newu.groupIDs = user.groupIDs ? user.groupIDs : [];
          newu.picture = user.profilePicture;
          this.users.push(newu);
        }
      }
    }
    console.log(this.users);
  }
}
