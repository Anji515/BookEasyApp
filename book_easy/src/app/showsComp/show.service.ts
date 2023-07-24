// show.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Show } from './show.model';

@Injectable({
  providedIn: 'root',
})

export class ShowService {
  private apiUrl = 'https://easy-book.onrender.com'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Function to handle error responses from API calls
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(error || 'Server error');
  }

  // Create a new show
  createShow(show: Show): Observable<Show> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<Show>(`${this.apiUrl}/shows`, show, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Get a specific show by ID
  getShowById(showId: string): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/shows/${showId}`).pipe(
      catchError(this.handleError)
    );
  }

  getShowsByMovieId(movieId: string): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/shows/movie/${movieId}`);
  }

  // Update a show by ID
  updateShow(showId: string, show: Show): Observable<Show> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.patch<Show>(`${this.apiUrl}/shows/${showId}`, show, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a show by ID
  deleteShow(showId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/shows/${showId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get all shows
  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/shows`).pipe(
      catchError(this.handleError)
    );
  }
}
