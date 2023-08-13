import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'protected-login',
  templateUrl: './auth.login.html',
  styleUrls: ['./auth.login.css']
})
export class LoginComponentProtected {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  submitForm() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        // console.log(response);
        if (response['user']['type'] == 'admin') {
          alert('Login successful !');
          localStorage.setItem('username',JSON.stringify(response['user']['name']))
          localStorage.setItem('token',JSON.stringify(response['token']))
          this.authService.setLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(true));
          this.router.navigate(['/movies']);
        } else {
          alert('Login failure, Invalid credentials !');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

