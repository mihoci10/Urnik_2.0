import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrnikComponent } from './urnik.component';

describe('UrnikComponent', () => {
  let component: UrnikComponent;
  let fixture: ComponentFixture<UrnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
