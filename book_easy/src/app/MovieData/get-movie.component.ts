import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../movieComp/movie.model';
import { MovieService } from '../movieComp/movie.service';

@Component({
  selector: 'app-get-movie',
  templateUrl: './get-movie.component.html',
  styleUrls: ['./get-movie.component.css']
})
export class GetMovieComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  selectedLanguage: string = '';
  sortOption: string = 'title'; // Default sort by title
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies(this.selectedLanguage, this.sortOption).subscribe(
      (movies) => {
        this.movies = movies;
        this.filteredMovies = this.movies.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
        this.totalPages = Math.ceil(this.movies.length / this.itemsPerPage);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.filteredMovies = this.movies.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  getStarRating(reviews: number): string {
    return '★'.repeat(reviews);
  }

  bookTicket(movieId: string) {
    this.router.navigate(['/movie-details', movieId]);
  }
}
