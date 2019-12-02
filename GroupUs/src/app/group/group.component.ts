import { Component, OnInit } from '@angular/core';
import { GroupEvent } from '../models/Event'
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
  newGroupMembers: User[];
  filteredUsers: any[];

  users:User[];
  events:GroupEvent[];

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
        this.getEventInfo();
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
        this.canEdit = true;
        //this.canEdit = this.service.getCurrUser() && this.currUserInGroup(this.g);
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

  getEventInfo() {
    this.events = [];
    for (let event of this.g.events) {
      let newe:GroupEvent = new GroupEvent();
      newe._id = event._id;
      newe.title = event.title;
      newe.description = event.description;
      newe.dateOfEvent = event.dateOfEvent;
      newe.time = event.time;
      newe.locationName = event.locationName;
      newe.locationAddress = event.locationAddress;
      this.events.push(newe);
    }
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

  initNewGroupMembers() {
    this.newGroupMembers = [];
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

    for (let m of this.g.members) {
      if (u.username === m) {
        found = true;
        break;
      }
    }

    return found;
  }
}
