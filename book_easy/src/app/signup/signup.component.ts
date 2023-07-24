import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  type: string = '';
  membership:string= '';
  gender:string= '';

  constructor(private http: HttpClient) {}

  submitForm() {
    const formData = {
      name: this.name,
      email: this.email,
      password: this.password,
      type: this.type,
      gender: this.gender,
      membership:this.membership
    };
  
    this.http.post('https://easy-book.onrender.com/signup', formData).subscribe(
      (response) => {
        // Handle successful signup response
        console.log(response);
      },
      (error) => {
        // Handle signup error
        console.error(error);
      }
    );
  }  
}
