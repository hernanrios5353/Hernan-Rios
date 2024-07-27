import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, shareReplay, catchError } from 'rxjs/operators';

// Importación de interfaces 
import { Movie, MovieData } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // URL del archivo JSON que contiene los datos de las películas.
  private jsonUrl = '../../../../assets/list_movies.json';

  // Subjects para almacenar y emitir cambios en el filtro de nombre, descripción y género.
  private nameFilter$ = new BehaviorSubject<string>('');
  private descriptionFilter$ = new BehaviorSubject<string>('');
  private genreFilter$ = new BehaviorSubject<string>('');

  // Tiempo de espera para el filtro de nombre y descripción.
  private time = 300;

  // Observable que almacena y comparte los datos de las películas.
  private data$: Observable<MovieData>;

  // Subject para emitir mensajes de error.
  private errorMessage$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.data$ = this.fetchMovieData().pipe(
      shareReplay(1),
      catchError((error: AxiosError) => {
        const message = 'Tuvimos un error al obtener los datos de las películas. Por favor, intente de nuevo más tarde.';
        this.errorMessage$.next(message); // Emitir mensaje de error.
        return of({ movies: [], genres: [] } as MovieData); // Retorna un valor por defecto de MovieData en caso de error.
      })
    );
  }

  // Método que obtiene los datos de las películas desde el archivo JSON utilizando Axios.
  private fetchMovieData(): Observable<MovieData> {
    return new Observable<MovieData>(observer => {
      axios.get<MovieData>(this.jsonUrl)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError) => {
          const message = 'Lo sentimos estamos teniendo problemas para obtener los datos de las películas. Por favor intente de nuevo más tarde.';
          this.errorMessage$.next(message); // Emitir mensaje de error.
          observer.error(error); // Emitir error al observable
        });
    }).pipe(
      catchError((error: AxiosError) => {
        const message = 'Lo sentimos estamos teniendo problemas para obtener los datos de las películas. Por favor intente de nuevo más tarde.';
        this.errorMessage$.next(message); // Emitir mensaje de error.
        return of({ movies: [], genres: [] } as MovieData); // Retorna un valor por defecto de MovieData en caso de error.
      })
    );
  }

  // Devuelve un observable con la lista completa de películas.
  getMovies(): Observable<Movie[]> {
    return this.data$.pipe(
      map(data => data.movies),
      catchError(() => {
        const message = 'Lo sentimos, no se pudo obtener la lista de películas.';
        this.errorMessage$.next(message); // Emitir mensaje de error.
        return of([]); // Retorna una lista vacía en caso de error.
      })
    );
  }

  // Obtiene y devuelve un observable con la lista de géneros disponibles.
  getGenres(): Observable<string[]> {
    return this.data$.pipe(
      map(data => data.genres),
      catchError(() => {
        const message = 'Lo sentimos, no se pudieron obtener los géneros de las películas.';
        this.errorMessage$.next(message); // Emitir mensaje de error.
        return of([]); // Retorna una lista vacía en caso de error.
      })
    );
  }

  // Devuelve un observable con la lista de películas filtradas por nombre, descripción y género.
  getFilteredMovies(): Observable<Movie[]> {
    return combineLatest([
      this.getMovies(),
      this.nameFilter$.pipe(debounceTime(this.time), distinctUntilChanged()),
      this.descriptionFilter$.pipe(debounceTime(this.time), distinctUntilChanged()),
      this.genreFilter$
    ]).pipe(
      map(([movies, name, description, genre]) =>
        movies.filter(movie =>
          movie.title.toLowerCase().includes(name.toLowerCase()) &&
          movie.description.toLowerCase().includes(description.toLowerCase()) &&
          (genre === '' || movie.genre === genre)
        )
      ),
      catchError(() => {
        const message = 'Ocurrió un error al buscar las películas.';
        this.errorMessage$.next(message); // Emitir mensaje de error.
        return of([]); // Retorna una lista vacía en caso de error.
      })
    );
  }

  // Actualiza el filtro de nombre.
  updateNameFilter(name: string) {
    this.nameFilter$.next(name);
  }

  // Actualiza el filtro de descripción.
  updateDescriptionFilter(description: string) {
    this.descriptionFilter$.next(description);
  }

  // Actualiza el filtro de género.
  updateGenreFilter(genre: string) {
    this.genreFilter$.next(genre);
  }

  // Devuelve un observable con mensajes de error.
  getErrorMessage(): Observable<string | null> {
    return this.errorMessage$.asObservable();
  }
}
