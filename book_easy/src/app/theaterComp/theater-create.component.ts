import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from './theater.model';
import { TheaterService } from './theater.service';

@Component({
  selector: 'app-theater-create',
  templateUrl: './theater-create.component.html',
  styleUrls: ['./theater-create.component.css']
})
export class TheaterPostComponent{
  theater: Theater = {name: '', address: '', city: '', state: '', capacity: 0 };
  isNew: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private theaterService: TheaterService) {}



  onSubmit() {
      this.theaterService.createTheater(this.theater).subscribe(
        (theater) => {
          console.log(theater);
          this.router.navigate(['/theaters']);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}