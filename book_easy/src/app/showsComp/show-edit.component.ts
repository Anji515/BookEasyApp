// show-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from './show.model';
import { ShowService } from './show.service';

@Component({
  selector: 'app-show-edit',
  templateUrl: './show-edit.component.html',
  styleUrls: ['./show-edit.component.css']
})
export class ShowEditComponent implements OnInit {
  show: Show = { movie_id: '', theater_id: '', show_timing: [], category: [] , dates: [] };
  showId: any='';

  constructor(private route: ActivatedRoute, private router: Router, private showService: ShowService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.showId = params['showId'];
      this.getShowById(this.showId);
    });
  }

  getShowById(showId: any) {
    // console.log('show id',showId)
    this.showService.getShowById(showId).subscribe(
      (show) => {
        this.show = show;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    this.showService.updateShow(this.showId, this.show).subscribe(
      (updatedShow) => {
        console.log(updatedShow); // Display the updated show data
        this.router.navigate(['/shows']); // Navigate back to the show list
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
