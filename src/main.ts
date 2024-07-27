import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { MoviesContainerComponent } from './app/features/movies/movies-container/movies-container.component';
import { routes } from './app/app.routes'; 

bootstrapApplication(MoviesContainerComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));