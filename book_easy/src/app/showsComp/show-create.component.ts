// show-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from './show.model';
import { ShowService } from './show.service';

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.css']
})
export class ShowCreateComponent implements OnInit {
  show: Show = { movie_id: '', theater_id: '', show_timing: [], category: [], dates:[] };

  constructor(private router: Router, private showService: ShowService) {}

  ngOnInit() {}

  onSubmit() {
    this.showService.createShow(this.show).subscribe(
      (createdShow) => {
        console.log(createdShow); // Display the created show data
        this.router.navigate(['/shows']); // Navigate back to the show list
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
