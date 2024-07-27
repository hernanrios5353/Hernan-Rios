//core
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

// servicio
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent {

  titulo: string = 'Encuentra tu película';

  // Observable que almacena la lista de géneros disponibles.
  genres$ = this.movieService.getGenres();

  // Constructor que inyecta el servicio de películas.
  constructor(private movieService: MovieService) {}

  // Método que actualiza el filtro de nombre.
  updateNameFilter(event: Event) {
    this.movieService.updateNameFilter((event.target as HTMLInputElement).value);
  }

  // Método que actualiza el filtro de descripción.
  updateDescriptionFilter(event: Event) {
    this.movieService.updateDescriptionFilter((event.target as HTMLInputElement).value);
  }

  // Método que actualiza el filtro de género.
  updateGenreFilter(event: MatSelectChange) {
    this.movieService.updateGenreFilter(event.value);
  }

}
