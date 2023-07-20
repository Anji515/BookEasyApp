import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movie: Movie = { title: '', description: '', duration: 0, genre: '', language: '', release_date: new Date(), image_cover: '', rating: 0 };
  isNew: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['movieId'];
      console.log('movieId',movieId)
      if (movieId) {
          this.isNew = false;
          this.getMovieById(movieId);
        
      }
    });
  }

  getMovieById(movieId: any) {
    console.log('getMovieById',movieId)
    this.movieService.getMovieById(movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.isNew) {
      this.movieService.createMovie(this.movie).subscribe(
        (movie) => {
          console.log(movie);
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.movieService.updateMovie(this.movie._id, this.movie).subscribe(
        (movie) => {
          console.log(movie);
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
