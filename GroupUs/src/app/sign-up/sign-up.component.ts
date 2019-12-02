import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  service: ApiService;
  registerData:any;

  msg:string;

  errorDetected:boolean;

  constructor(private router: Router, private s: ApiService) {
    this.service = s;
    //if (this.service.getCurrUser() != null)
    //  router.navigate(['/home']);
  }

  ngOnInit() {
  }

  tryRegister(fname:string, lname:string, u:string, p:string) {
    this.msg = 'Creating user...';
    this.service.register(fname, lname, u, p).subscribe(
      data => { this.registerData = data; },
      err => { console.error(err); this.errorDetected = true; this.msg = 'Registration failed'},
      () => { 
        console.log(this.registerData);
        this.msg = 'Register successful!';
      }
    );
  }

  toSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
