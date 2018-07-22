import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionEsperaComponent } from './peticion-espera.component';

describe('PeticionEsperaComponent', () => {
  let component: PeticionEsperaComponent;
  let fixture: ComponentFixture<PeticionEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
