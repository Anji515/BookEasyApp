import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginComponentProtected } from './authenticate/login.component';
import { MovieComponent } from './Movies/movie.component';
import { MovieListComponent } from './movieComp/movie-list.component';
import { MovieFormComponent } from './movieComp/movie-form.component';
import { MovieDetailComponent } from './movieComp/movie-detail.component';
import { MoviePostComponent } from './movieComp/movie-create.component';
import { TheaterListComponent } from './theaterComp/theater-list.component';
import { TheaterFormComponent } from './theaterComp/theater-form.component';
import { TheaterDetailComponent } from './theaterComp/theater-detail.component';
import { TheaterPostComponent } from './theaterComp/theater-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LoginComponentProtected,
    MovieComponent,
    MovieListComponent,
    MovieFormComponent,
    MovieDetailComponent,
    MoviePostComponent,
    TheaterListComponent,
    TheaterPostComponent,
    TheaterFormComponent,
    TheaterDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
