import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = "Login";
  model: any = {};

  constructor(public router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/eventos']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['/eventos']);
      },
      error => {
        console.log("Falha no login ");
      }
    );
  }



}
