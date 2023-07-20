import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from './theater.model';
import { TheaterService } from './theater.service';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.css']
})
export class TheaterFormComponent implements OnInit {
  theater: Theater = {name: '', address: '', city: '', state: '', capacity: 0 };
  isNew: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private theaterService: TheaterService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const theaterId = params['theaterId'];
      console.log('theaterId',theaterId)
      if (theaterId) {
          this.isNew = false;
          this.getMovieById(theaterId);
        
      }
    });
  }

  getMovieById(theaterId: any) {
    console.log('theaterIdGetBy ID',theaterId)
    this.theaterService.getTheaterById(theaterId).subscribe(
      (theater) => {
        this.theater = theater;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.isNew) {
      this.theaterService.createTheater(this.theater).subscribe(
        (theater) => {
          console.log(theater);
          this.router.navigate(['/theaters']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.theaterService.updateTheater(this.theater._id, this.theater).subscribe(
        (theater) => {
          console.log(theater);
          this.router.navigate(['/theates']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
