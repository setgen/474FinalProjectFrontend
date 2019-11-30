import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'GroupUs';
  menuClass='active bg-dark';

  status: boolean = true;
  clickEvent(){
    this.status = !this.status;       
  }

}
