import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movieComp/movie.model';
import { MovieService } from '../movieComp/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class SingleMovieComponent implements OnInit {
  movie: Movie={title: '', description: '', duration: 0, genre: '', language: '', release_date: new Date(), image_cover: '', rating: 0 };

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['movieId'];
      this.getMovieById(movieId);
    });
  }

  getStarRating(reviews: number): string {
    return '★'.repeat(reviews);
  }

  getMovieById(movieId: string) {
    this.movieService.getMovieById(movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

