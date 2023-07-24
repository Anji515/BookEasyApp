import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginComponentProtected } from './authenticate/login.component';
import { MovieComponent } from './Movies/movie.component';
import { MovieFormComponent } from './movieComp/movie-form.component';
import { MoviePostComponent } from './movieComp/movie-create.component';
import { TheaterListComponent } from './theaterComp/theater-list.component';
import { TheaterFormComponent } from './theaterComp/theater-form.component';
import { TheaterPostComponent } from './theaterComp/theater-create.component';
import { ShowEditComponent } from './showsComp/show-edit.component';
import { ShowListComponent } from './showsComp/show-list.component';
import { ShowCreateComponent } from './showsComp/show-create.component';
import { HomePageComponent } from './homepage/home.component';
// import { TheaterPostComponent } from './theaterComp/theater-create.component';


const routes: Routes = [
  { path:'user', component : LoginComponent},
  { path:'', component : HomePageComponent},
  {path:'signup',component: SignupComponent},
  {path:'admin',component: LoginComponentProtected},
  {path:'movies',component: MovieComponent},
  {path:'movies/create',component: MoviePostComponent},
  {path:'movies/:movieId',component: MovieFormComponent},
  {path:'theaters',component: TheaterListComponent},
  {path:'theaters/create',component: TheaterPostComponent},
  {path:'theaters/:theaterId',component: TheaterFormComponent},
  {path:'shows',component: ShowListComponent},
  {path:'shows/create',component: ShowCreateComponent},
  {path:'shows/:showId',component: ShowEditComponent},
  // {path:'theaters/create',component: TheaterPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
