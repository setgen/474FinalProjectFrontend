import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GroupUs';
  menuClass='active bg-dark';

  status: boolean = true;
  clickEvent(){
    this.status = !this.status;       
  }

}
