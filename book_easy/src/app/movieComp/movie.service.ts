import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://127.0.0.1:5000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getMovies(language: string, sortOption: string): Observable<Movie[]> {
    let params = new HttpParams();
    if (language) {
      params = params.append('language', language);
    }
    if (sortOption) {
      params = params.append('sort', sortOption);
    }
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`, { params });
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
