import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theater } from './theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  private apiUrl = 'https://easy-book.onrender.com/theaters';

  constructor(private http: HttpClient) { }

  getTheaters(): Observable<Theater[]> {
    return this.http.get<Theater[]>(this.apiUrl);
  }

  getTheaterById(theaterId: string): Observable<Theater> {
    const url = `${this.apiUrl}/${theaterId}`;
    return this.http.get<Theater>(url);
  }

  createTheater(theater: Theater): Observable<any> {
    return this.http.post(this.apiUrl, theater);
  }

  updateTheater(theaterId: string, theater: Theater): Observable<any> {
    const url = `${this.apiUrl}/${theaterId}`;
    return this.http.patch(url, theater);
  }

  deleteTheater(theaterId: string): Observable<any> {
    const url = `${this.apiUrl}/${theaterId}`;
    return this.http.delete(url);
  }
}
