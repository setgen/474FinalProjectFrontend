import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './models/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventPlanner';
  menuClass='active bg-dark';

  service: ApiService;
  u:User;

  constructor(private _apiService: ApiService, private router: ActivatedRoute) {
    this.service = _apiService;
    this.u = _apiService.getCurrUser();
    if (this.u == null){
      //if (router.url != '/sign-in' && router.url != '/sign-up') {
      //  router.navigate(['/sign-in']);
      //}
    }
  }

  public onRouterOutletActivate(event : any) {
    this.u = this.service.getCurrUser();
  }

  logout() {
    this.service.logout();
  }
}
