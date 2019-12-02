import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/User'
import { Group } from '../models/Group'
import { GroupEvent } from '../models/Event'

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
    
    this.userData = null;
    this.groupData = null;
    this.u = null;
    this.groups = [];
    this.canEdit = false;
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
      err => { 
        console.error(err); 
        this.editProfileMsg = 'An error occurred when updating user.';
        this.retrieveUsers(this.service);
        this.setEditingUser(false); 
      },
      () => {
        this.retrieveUsers(this.service);
        this.setEditingUser(false);
      }
    )
  }

  initNewGroupMembers() {
    this.newGroupMembers = [this.u];
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
        this.groupMsg = '';
        this.retrieveUsers(this.service);
      }
    )
  }

  removeGroup(g:Group) {
    /*
    this.groups.splice(this.groups.indexOf(g),1);

    this.u.groupIDs = this.groups.map(g => g.groupID);
    this.groupMsg = 'Updating groups...'
    this.service.updateUser(this.u).subscribe(
      data => {},
      err => { console.error(err); this.groupMsg = 'An error occurred when updating user.'; this.retrieveUsers(this.service) },
      () => {
        this.groupMsg = '';
      }
    )
    */
   console.log('removing group');
   console.log(g);
    g.members.splice(g.members.indexOf(this.id),1);
    this.service.updateGroup(g).subscribe(
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
        newu.groupIDs = user.groupIDs ? user.groupIDs : [];
        newu.picture = user.profilePicture;
        this.u = newu;
        this.canEdit = this.service.getCurrUser() && this.service.getCurrUser().username === this.id;
      }
    };
  }

  getGroupInfo() {
    this.groups = [];
    for (let group of this.groupData) {
      for (let m of group.members) {
        if(m === this.id) {
          let newg = new Group();
          newg.groupID = group._id;
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
