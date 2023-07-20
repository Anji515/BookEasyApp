// src/app/movie/movie.component.ts

import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  newMovie: any = {};
  movies: any[] = [];
  updateMovieId = '';
  deleteMovieId = '';
  updatedMovieData:any={}

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  onCreateMovie(): void {
    this.movieService.createMovie(this.newMovie).subscribe(
      (response: any) => {
        console.log('Movie created successfully', response);
        this.getMovies();
      },
      (error: any) => {
        console.error('Error creating movie', error);
      }
    );
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies: any[]) => {
        this.movies = movies;
      },
      (error: any) => {
        console.error('Error getting movies', error);
      }
    );
  }

  onDeleteMovie(): void {
    this.movieService.deleteMovie(this.deleteMovieId).subscribe(
      (response: any) => {
        console.log('Movie deleted successfully', response);
        this.getMovies();
      },
      (error: any) => {
        console.error('Error deleting movie', error);
      }
    );
  }

  onUpdateMovie(): void {

    this.movieService.updateMovie(this.updateMovieId, this.updatedMovieData).subscribe(
      (response: any) => {
        console.log('Movie updated successfully', response);
        this.getMovies();
      },
      (error: any) => {
        console.error('Error updating movie', error);
      }
    );
  }
}
