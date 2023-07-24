import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movieComp/movie.model';
import { MovieService } from '../movieComp/movie.service';
import { Show } from '../showsComp/show.model';
import { ShowService } from '../showsComp/show.service';


@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class SingleMovieComponent implements OnInit {
  movie: Movie = { 
    title: '',
    description: '',
    duration: 0,
    genre: '',
    language: '',
    release_date: new Date(),
    image_cover: '',
    rating: 0,
   }; // Initialize with default values or an empty object
  shows: Show[] = [];
  selectedMovieId: string = ''; // Store the selected movie ID from the route parameter

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private showService: ShowService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedMovieId = params['movieId'];
      console.log(this.selectedMovieId)
      this.getMovieAndShows();
    });
  }

  getMovieAndShows() {
    // Get the movie details
    this.movieService.getMovieById(this.selectedMovieId).subscribe(
      (movie) => {
        this.movie = movie;
        // Now fetch the show details for the selected movie
        this.getShowsForMovie();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getShowsForMovie() {
    this.showService.getShowsByMovieId(this.selectedMovieId).subscribe(
      (shows) => {
        this.shows = shows;
        console.log(this.shows)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  bookTicket(showId: any) {
    alert(showId)
    console.log(`Book ticket clicked for Show ID: ${showId}`);
   }

    getStarRating(reviews: number): string {
    return '★'.repeat(reviews);
  }

  // Other helper methods as needed
}