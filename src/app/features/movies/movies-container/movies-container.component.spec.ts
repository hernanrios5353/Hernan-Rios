import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesContainerComponent } from './movies-container.component';

describe('MoviesContainerComponent', () => {
  let component: MoviesContainerComponent;
  let fixture: ComponentFixture<MoviesContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MoviesContainerComponent]
    });
    fixture = TestBed.createComponent(MoviesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
