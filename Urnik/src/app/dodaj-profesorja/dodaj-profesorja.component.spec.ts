import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajProfesorjaComponent } from './dodaj-profesorja.component';

describe('DodajProfesorjaComponent', () => {
  let component: DodajProfesorjaComponent;
  let fixture: ComponentFixture<DodajProfesorjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajProfesorjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajProfesorjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
