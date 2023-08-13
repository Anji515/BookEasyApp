import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  submitForm() {
    const formData = {
      email: this.email,
      password: this.password
    };

    this.http.get('https://easy-book.onrender.com/user',{
        headers: {
          "Content-Type": "application/json",
        },
        params: formData,
      }).subscribe(
      (response: any) => {
        // Handle successful login response
        // console.log(response);
        if(response['type']=='user'){
          alert('Login successful !')
          localStorage.setItem('normal_user',JSON.stringify(true))
          localStorage.setItem('normal_username',JSON.stringify(response['name']))
        }else{
          alert('Login failure, Invalid credentials !')
        }
      },
      (error) => {
        // Handle login error
        console.error(error);
      }
    );
  }
}
