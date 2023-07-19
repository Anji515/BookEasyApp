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

    this.http.get('http://127.0.0.1:5000/user',{
        headers: {
          "Content-Type": "application/json",
        },
        params: formData,
      }).subscribe(
      (response: any) => {
        // Handle successful login response
        console.log(response);
        if(response['type']=='user'){
          alert('Login successful !')
          localStorage.setItem('user',JSON.stringify(true))
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
