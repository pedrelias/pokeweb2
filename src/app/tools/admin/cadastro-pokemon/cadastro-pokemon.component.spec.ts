import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPokemonComponent } from './cadastro-pokemon.component';

describe('CadastroPokemonComponent', () => {
  let component: CadastroPokemonComponent;
  let fixture: ComponentFixture<CadastroPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
