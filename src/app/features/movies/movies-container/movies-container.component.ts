// core
import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';

// componentes
import { MovieFilterComponent } from '../components/movie-filter/movie-filter.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MovieFilterComponent,
    MovieListComponent,
    MatToolbarModule,
  ],
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements AfterViewInit {

  @ViewChild('filter', { static: false, read: ElementRef }) filter: ElementRef | null = null;
  buttonVisible: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    this.checkScrollPosition(); // Verifica la posición del scroll al inicializar
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkScrollPosition();
  }

  // Método para verificar la posición del scroll y mostrar el botón de scroll.
  checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.filter && this.filter.nativeElement) {
      const elementPosition = this.filter.nativeElement.offsetTop;
      // Mostrar el botón cuando se haya alejado 300px del componente 'app-movie-filter'
      this.buttonVisible = scrollTop > elementPosition + 300;
    }

  }

  // Método para hacer scroll hasta el filtro de películas.
  scrollToFilter() {
    if (this.filter && this.filter.nativeElement) {
      const elementPosition = this.filter.nativeElement.offsetTop;
      window.scrollTo({
        top: elementPosition - 450,
        behavior: 'smooth'
      });
    } else {
      console.error('Filter element is not available.');
    }
  }

}
