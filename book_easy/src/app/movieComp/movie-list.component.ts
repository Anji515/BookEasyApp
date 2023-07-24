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

  selectedLanguage: string = '';
  sortOption: string = 'title'; // Default sort by title
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private router: Router, private movieService: MovieService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getMovies();
  }


  getMovies() {
    this.movieService.getMovies(this.selectedLanguage, this.sortOption).subscribe(
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

  onPageChange(page: number) {
    this.currentPage = page;
    // Fetch movies for the selected page
    this.getMovies();
  }
  
}
