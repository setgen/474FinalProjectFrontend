import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/User';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private s: ApiService) {
    this.msg = '';
    this.service = s;
    if (this.service.getCurrUser() != null)
      router.navigate(['/user/' + this.service.getCurrUser().username]);
  }

  ngOnInit() {
  }

  title = 'GroupUs';
  menuClass='active bg-dark';

  service: ApiService
  loginData:any;

  status: boolean = true;
  errorDetected: boolean = false;

  msg:string;

  clickEvent(){
    this.status = !this.status;
  }

  tryLogin(u:string, p:string) {
    this.msg = 'Logging in...';
    this.service.login(u,p).subscribe(
      data => { this.loginData = data; },
      err => { console.error(err); this.errorDetected = true; this.msg = 'Login failed'; },
      () => { 
        console.log('log in successful'); 
        console.log(this.loginData);
        this.service.setToken(this.loginData.token);

        let curru:User = new User();
        curru.id = this.loginData.user._id;
        curru.username = this.loginData.user.username;
        curru.password = this.loginData.user.password;
        curru.firstName = this.loginData.user.firstName;
        curru.lastName = this.loginData.user.lastName;
        curru.picture = this.loginData.user.profilePicture;
        curru.bio = this.loginData.user.bio;
        curru.groupIDs = this.loginData.user.groupIDs;
        this.service.setCurrUser(curru);

        this.router.navigate(['user/' + curru.username]);
      }
    );
  }

  toSignUp(){
    this.router.navigate(['sign-up']);
  }
}
