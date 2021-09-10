import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieTitleComponent } from './search-movie-title.component';

describe('SearchMovieTitleComponent', () => {
  let component: SearchMovieTitleComponent;
  let fixture: ComponentFixture<SearchMovieTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMovieTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
