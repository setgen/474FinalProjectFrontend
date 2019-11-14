import { Component, OnInit } from '@angular/core';
import { Binary } from 'selenium-webdriver/firefox';

/* DUMMY DATA */
class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
  id: number;
  groupIDs: number[];
  picture: Binary;
}

class Group {
  groupID: number;
  groupName: string;
  members: number[];
}

let testUser = new User();
testUser.firstName = 'Ryan';
testUser.lastName = 'Gallamoza';
testUser.username = 'rgallamoza';
testUser.password = 'P@$$W0RD';
testUser.bio = 'Hi! My name is Ryan Gallamoza. I am a front end developer for GroupUs. Please email me at ryang@udel.edu if you have any questions or concerns!';
testUser.id = 111;
testUser.groupIDs = [1, 3, 5];

let g1 = new Group(), g2 = new Group(), g3 = new Group(), g4 = new Group(), g5 = new Group();
g1.groupID = 123;
g1.groupName = 'D&D Group';
g1.members = [1, 2, 3, 4, 5, 6, 7];
g2.groupID = 456;
g2.groupName = "Gallamoza Family's Group";
g2.members = [1, 2, 3, 4, 5, 6, 7, 8, 9];
g3.groupID = 789;
g3.groupName = "Cool Kids Club";
g3.members = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
g4.groupID = 111;
g4.groupName = "Apartment Group";
g4.members = [1, 2, 3, 4];
g5.groupID = 222;
g5.groupName = "Friends Group";
g5.members = [1, 2, 3, 4, 5];
/* END OF DUMMY DATA */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  u: User;
  groups: Group[];
  filteredGroups: Group[];

  canEdit: boolean;
  editingUserInfo: boolean;

  constructor() { 
    this.u = testUser;
    this.groups = [g1,g2,g3,g4,g5];
    this.filteredGroups = this.groups;

    this.canEdit = true; //tokenID == this.u.id;
    this.editingUserInfo = false;
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
}
