import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from './theater.model';
import { TheaterService } from './theater.service';

@Component({
  selector: 'app-theater-detail',
  templateUrl: './theater-detail.component.html',
  styleUrls: ['./theater-details.component.css']
})
export class TheaterDetailComponent implements OnInit {
  theater: Theater = {name: '', address: '', city: '', state: '', capacity: 0 };

  constructor(private route: ActivatedRoute, private router: Router, private theaterService: TheaterService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const theaterId = params['theaterId'];
      console.log('getId',theaterId)
      this.getMovieById(theaterId);
    });
  }

  getMovieById(theaterId: any) {
    console.log('mvDetails',theaterId)
    this.theaterService.getTheaterById(theaterId).subscribe(
      (theater) => {
        this.theater = theater;
        console.log("this.theater",this.theater)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/theaters']);
  }
}
