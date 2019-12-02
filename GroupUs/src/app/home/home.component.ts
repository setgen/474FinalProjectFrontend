import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
