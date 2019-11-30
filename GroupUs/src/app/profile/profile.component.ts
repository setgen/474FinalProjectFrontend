import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

/* DUMMY DATA */
class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
  id: string;
  groupIDs: string[];
  picture: string;
}

class Group {
  groupID: string;
  groupName: string;
  members: string[];
  events: Event[];
}

class Event {

}

let testUser = new User();
testUser.firstName = 'Ryan';
testUser.lastName = 'Gallamoza';
testUser.username = 'rgallamoza';
testUser.password = 'P@$$W0RD';
testUser.bio = 'Hi! My name is Ryan Gallamoza. I am a front end developer for GroupUs. Please email me at ryang@udel.edu if you have any questions or concerns!';
testUser.id = "111";
testUser.groupIDs = ['1', '3', '5'];
testUser.picture = "data:image/jpeg;base64,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"

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
  userData: any;
  groupData: any;

  id: string;
  u: User;
  groups: Group[];
  filteredGroups: Group[];

  canEdit: boolean;
  editingUserInfo: boolean;
  errorDetected: boolean;

  constructor(private service: ApiService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('username');
    console.log(this.id);
    this.userData = null;
    this.u = null;
    this.groups = [];
    this.canEdit = true;
    this.editingUserInfo = false;
    this.errorDetected = false;

    this.retrieveUsers(service);
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
