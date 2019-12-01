import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/User'
import { Group } from '../models/Group'
import { Event } from '../models/Event'

/* DUMMY DATA */
let g1 = new Group(), g2 = new Group(), g3 = new Group(), g4 = new Group(), g5 = new Group();
g1.groupID = "123";
g1.groupName = 'D&D Group';
g1.members = ['1', '2', '3'];
g2.groupID = "456";
g2.groupName = "Gallamoza Family's Group";
g2.members = ['1', '2', '3', '4'];
g3.groupID = "789";
g3.groupName = "Cool Kids Club";
g3.members = ['1', '2', '3', '4', '5'];
g4.groupID = "111";
g4.groupName = "Apartment Group";
g4.members = ['1', '2', '3', '4'];
g5.groupID = "222";
g5.groupName = "Friends Group";
g5.members = ['1', '2', '3', '4', '5'];
/* END OF DUMMY DATA */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  service: ApiService
  userData: any;
  groupData: any;

  id: string;
  u: User;
  groups: Group[];
  filteredGroups: Group[];

  canEdit: boolean;
  editingUserInfo: boolean;
  errorDetected: boolean;

  constructor(private s: ApiService, private route: ActivatedRoute) {
    this.service = s;
    this.id = this.route.snapshot.paramMap.get('username');
    console.log(this.id);
    this.userData = null;
    this.u = null;
    this.groups = [];
    this.canEdit = true;
    this.editingUserInfo = false;
    this.errorDetected = false;

    this.retrieveUsers(this.service);
  }

  ngOnInit() {

  }

  filterGroupName(filter:string) {
    this.filteredGroups = this.groups.filter(g => g.groupName.toLowerCase().includes(filter.toLowerCase()));
  }

  setEditingUser(b:boolean) {
    this.editingUserInfo = b;
  }

  setUserInfo(f:string, l:string, b:string) {
    this.u.firstName = f;
    this.u.lastName = l;
    this.u.bio = b;
  }

  removeGroup(g:Group) {
    this.groups.splice(this.groups.indexOf(g),1);
  }

  uploadProfilePic(files:FileList) {
    if (files.length == 0) return;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => this.u.picture = reader.result.toString();
    reader.onerror = err => console.log(err);
  }

  retrieveUsers(service: ApiService) {
    service.getUsers().subscribe(
      data => { this.userData = data; },
      err => { console.error(err); this.errorDetected = true; },
      () => { 
        console.log('done loading users'); 
        console.log(this.userData);
        this.getUserInfo();
        this.retrieveGroups(service);
      }
    );
  }

  retrieveGroups(service: ApiService) {
    service.getGroups().subscribe(
      data => { this.groupData = data; },
      err => { console.error(err); this.errorDetected = true; },
      () => {
        console.log('done loading groups');
        console.log(this.groupData);
        this.getGroupInfo();
      }
    )
  }

  getUserInfo() {
    for (let user of this.userData) {
      if(user.username === this.id) {
        let newu = new User();
        newu.firstName = user.firstName;
        newu.lastName = user.lastName;
        newu.username = user.username;
        newu.password = user.password;
        newu.bio = user.bio;
        newu.id = user._id;
        newu.groupIDs = user.groupIDs;
        newu.picture = user.profilePicture;
        this.u = newu;
        this.canEdit = this.service.getCurrUser() && this.service.getCurrUser().username === this.id;
      }
    };
  }

  getGroupInfo() {
    for (let group of this.groupData) {
      for (let gid of this.u.groupIDs) {
        if(group._id === gid) {
          let newg = new Group();
          newg.groupID = gid;
          newg.groupName = group.groupName;
          newg.members = group.members;
          newg.events = group.events;
          this.groups.push(newg);
        }
      }
    }
    this.filterGroupName('');
    console.log(this.groups);
  }
}
