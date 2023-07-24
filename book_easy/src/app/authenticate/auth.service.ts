import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const formData = {
      email: email,
      password: password
    };

    return this.http.get('https://easy-book.onrender.com/admin', {
      headers: {
        "Content-Type": "application/json",
      },
      params: formData,
    });
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('admin');
    // Add any additional logout logic here, e.g., clearing local storage, etc.
  }
}