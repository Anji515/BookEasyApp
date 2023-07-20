import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie = { title: '', description: '', duration: 0, genre: '', language: '', release_date: new Date(), image_cover: '', rating: 0 };

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['movieId'];
      // console.log('mvDetailsfn',movieId)
      this.getMovieById(movieId);
    });
  }

  getMovieById(movieId: any) {
    // console.log('mvDetails',movieId)
    this.movieService.getMovieById(movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
