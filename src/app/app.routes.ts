import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () => import('./features/movies/components/movie-list/movie-list.component').then(m => m.MovieListComponent),
  },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];