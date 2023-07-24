// show-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Show } from './show.model';
import { ShowService } from './show.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  shows: Show[] = [];
  hoveredCard: string | null = null; // Add the hoveredCard property


  constructor(private router: Router, private showService: ShowService) {}

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.showService.getShows().subscribe(
      (shows) => {
        this.shows = shows;
        console.log(this.shows)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showDetails(showId: any) {
    this.hoveredCard = showId;
  }

  hideDetails() {
    this.hoveredCard = null;
  }


  editShow(showId: any) {
    // Navigate to the edit show component with the given showId
    this.router.navigate(['/shows', showId]);
  }

  deleteShow(showId: any) {
    this.showService.deleteShow(showId).subscribe(
      () => {
        this.getShows(); // Refresh the list after successful deletion
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
