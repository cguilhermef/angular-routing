import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <p>
      <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </p>
  `
})
export class LoginComponent {

  message: string;

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    this.setMessage();
  }

  setMessage() {
    this.message = `Loged ${this.authService.isLoggedIn ? 'in' : 'out'}`;
  }

  login() {
    this.message = 'Tring to log in ...';
    this.authService
      .login()
      .subscribe(
        () => {
          this.setMessage();
          if (this.authService.isLoggedIn) {
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/crisis-center/admin';

            this.router.navigate([redirect]);
          }
        }
      )

  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}