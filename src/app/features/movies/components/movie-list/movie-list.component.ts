// core
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// servicio
import { MovieService } from '../../services/movie.service';

// Angular material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

// RxJS
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatCardModule, MatChipsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  // Observable que almacena la lista de películas filtradas.
  filteredMovies$ = this.movieService.getFilteredMovies();

  // Variable para almacenar el mensaje de error.
  errorMessage$: Observable<string | null>;

  constructor(private movieService: MovieService) {
    // Inicializa el observable del mensaje de error.
    this.errorMessage$ = this.movieService.getErrorMessage();
  }

  ngOnInit(): void {}
  
}
