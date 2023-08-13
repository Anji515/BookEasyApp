import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book_easy';
  isAdmin: boolean = false;
  isUser: boolean = false;

  ngOnInit() {
    const userRole = localStorage.getItem('user');
    if (userRole) {
      this.isAdmin = true;
      console.log('isAdm',this.isAdmin)
    }
  }

  getAdmnText(){
    const userRole = localStorage.getItem('user');
    return userRole ? 'Admin' : 'Admin login'
  }

  getDetails(){
    const userRole = localStorage.getItem('user');
    return userRole ? 'Logut' : 'User login'
  }

  logoutUser(): string | null {
    const users = localStorage.getItem("normal_username");
    const name = users ? JSON.parse(users) : null;
    return name;
  }

  getMovies(){
    const userRole = localStorage.getItem('user');
    return userRole ? 'Manage Movies' : undefined
  }

  logout() {
    // Remove user role from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('normal_username');
    localStorage.removeItem('normal_user');
    this.isAdmin = false;
  }
}
