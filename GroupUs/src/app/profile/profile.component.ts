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
  editProfileMsg: string;
  groupMsg: string;
  newGroupMembers: User[];
  filteredUsers: any[];

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
    this.editProfileMsg = '';
    this.groupMsg = '';

    this.retrieveUsers(this.service);
  }

  ngOnInit() {

  }

  filterGroupName(filter:string) {
    this.filteredGroups = this.groups.filter(g => g.groupName.toLowerCase().includes(filter.toLowerCase()));
  }

  setEditingUser(b:boolean) {
    this.editProfileMsg = '';
    this.editingUserInfo = b;
  }

  setUserInfo(f:string, l:string, b:string) {
    this.u.firstName = f;
    this.u.lastName = l;
    this.u.bio = b;

    this.editProfileMsg = 'Updating user...'
    this.service.updateUser(this.u).subscribe(
      data => {},
      err => { console.error(err); this.editProfileMsg = 'An error occurred when updating user.'; },
      () => {
        this.retrieveUsers(this.service);
        this.setEditingUser(false);
      }
    )
  }

  initNewGroupMembers() {
    this.newGroupMembers = [this.service.getCurrUser()];
  }

  addNewGroupMember(u:any) {
    let mem:User = new User();
    mem.firstName = u.firstName;
    mem.lastName = u.lastName;
    mem.username = u.username;
    mem.password = u.password;
    mem.bio = u.bio;
    mem.id = u._id;
    mem.groupIDs = u.groupIDs;
    mem.picture = u.profilePicture;

    this.newGroupMembers.push(mem);
  }

  removeMember(toRemove:User) {
    for (let m of this.newGroupMembers) {
      if (toRemove.username === m.username) {
        this.newGroupMembers.splice(this.newGroupMembers.indexOf(m),1);
        break;
      }
    }
  }

  filterUsernames(filter:string) {
    if (filter === '') {
      this.filteredUsers = [];
    }
    else {
      this.filteredUsers = this.userData.filter(u => u.username.toLowerCase().includes(filter.toLowerCase()) && !this.userInAddedList(u));
    }
  }

  userInAddedList(u:any):boolean {
    let found:boolean = false;

    for (let m of this.newGroupMembers) {
      if (u.username === m.username) {
        found = true;
        break;
      }
    }

    return found;
  }

  createGroup(name:string) {
    this.groupMsg = 'Creating group...';

    let newg:Group = new Group();
    newg.groupName = name;
    newg.members = this.newGroupMembers.map(u => u.username);
    newg.messages = [];
    newg.events = [];

    this.service.createGroup(newg).subscribe(
      data => {},
      err => {console.error(err); this.groupMsg = 'An error occurred when creating group.'},
      () => {
        for (let m of this.newGroupMembers) {
          m.groupIDs.push(newg.groupID);
          this.service.updateUser(m).subscribe(
            data => {},
            err => {console.error(err); this.groupMsg = 'An error occurred when creating group.'},
            () => {}
          )
        }
        this.retrieveUsers(this.service);
      }
    )
  }

  removeGroup(g:Group) {
    this.groups.splice(this.groups.indexOf(g),1);

    this.u.groupIDs = this.groups.map(g => g.groupID);
    this.groupMsg = 'Updating groups...'
    this.service.updateUser(this.u).subscribe(
      data => {},
      err => { console.error(err); this.groupMsg = 'An error occurred when updating user.'; this.retrieveUsers(this.service) },
      () => {
        this.groupMsg = '';
        this.retrieveUsers(this.service);
      }
    )
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
    this.groups = [];
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
    this.filterGroupName((<HTMLInputElement>document.getElementById("groupInput")).value);
    console.log(this.groups);
  }
}
