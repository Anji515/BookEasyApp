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
// import { TheaterPostComponent } from './theaterComp/theater-create.component';


const routes: Routes = [
  { path:'user', component : LoginComponent},
  {path:'signup',component: SignupComponent},
  {path:'admin',component: LoginComponentProtected},
  {path:'movies',component: MovieComponent},
  {path:'movies/create',component: MoviePostComponent},
  {path:'movies/:movieId',component: MovieFormComponent},
  {path:'theaters',component: TheaterListComponent},
  {path:'theaters/create',component: TheaterPostComponent},
  {path:'theaters/:theaterId',component: TheaterFormComponent},
  // {path:'theaters/create',component: TheaterPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
