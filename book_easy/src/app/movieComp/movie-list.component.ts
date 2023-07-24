import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private router: Router, private movieService: MovieService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getMovies();
  }


  getMovies() {
    this.movieService.getMovies().subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editMovie(movieId: any) {
    // console.log(movieId['$oid'])
    this.router.navigate(['/movies', movieId]);
  }

  deleteMovie(movieId: any) {
    this.movieService.deleteMovie(movieId).subscribe(
      (response) => {
        console.log(response);
        this.getMovies(); // Refresh the movie list after deletion
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
