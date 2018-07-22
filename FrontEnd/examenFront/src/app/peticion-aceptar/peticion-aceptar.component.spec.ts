import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionAceptarComponent } from './peticion-aceptar.component';

describe('PeticionAceptarComponent', () => {
  let component: PeticionAceptarComponent;
  let fixture: ComponentFixture<PeticionAceptarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionAceptarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionAceptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
