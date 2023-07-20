import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theater } from './theater.model';
import { TheaterService } from './theater.service';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.css']
})
export class TheaterListComponent implements OnInit {
  theaters: Theater[] = [];

  constructor(private router: Router, private theaterService: TheaterService) {}

  ngOnInit() {
    this.getTheaters();
  }

  getTheaters() {
    this.theaterService.getTheaters().subscribe(
      (theaters) => {
        this.theaters = theaters;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editTheater(theaterId: any) {
    console.log(theaterId)
    this.router.navigate(['/theaters', theaterId]);
    this.getTheaters()
  }

  deleteTheater(movieId: any) {
    this.theaterService.deleteTheater(movieId).subscribe(
      (response) => {
        console.log(response);
        this.getTheaters(); // Refresh the movie list after deletion
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
