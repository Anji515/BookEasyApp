import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MoviePostComponent{
  movie: Movie = { title: '', description: '', duration: 0, genre: '', language: '', release_date: new Date(), image_cover: '', rating: 0 };
  isNew: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {}



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