// src/app/movie/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://127.0.0.1:5000/movies';

  constructor(private http: HttpClient) { }

  createMovie(movieData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, movieData);
  }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteMovie(movieId: string): Observable<any> {
    const url = `${this.baseUrl}/${movieId}`;
    return this.http.delete<any>(url);
  }

  updateMovie(movieId: string, movieData: any): Observable<any> {
    const url = `${this.baseUrl}/${movieId}`;
    return this.http.patch<any>(url, movieData);
  }
}
