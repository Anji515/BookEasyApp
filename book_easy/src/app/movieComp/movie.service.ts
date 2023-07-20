import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://127.0.0.1:5000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${movieId}`);
  }

  createMovie(movieData: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, movieData);
  }

  updateMovie(movieId: string, movieData: Movie): Observable<Movie> {
    return this.http.patch<Movie>(`${this.baseUrl}/movies/${movieId}`, movieData);
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/movies/${movieId}`);
  }
}
