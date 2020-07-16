import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  constructor(public authService: AuthService
    , public router: Router) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  entrar(){
    this.router.navigate(['/user/login']);
  }

}
