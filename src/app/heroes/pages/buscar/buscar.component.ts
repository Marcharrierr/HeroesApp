import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/interface.heroes';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls:['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

@Output() onDebounce: EventEmitter <string> = new EventEmitter();

  termino: string ='';
  hayError: boolean = false;
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;
  debouncer: Subject<string> = new Subject

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300))
      .subscribe((valor)=>{
        this.onDebounce.emit(valor);
      })
  }

  buscando(){
    //.trim para quitar que de error por los espacios en blanco y no sea tan estricto
    this.heroesService.getSugerencias( this.termino.trim())
    .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent ){
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    this.hayError = false;
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId( heroe.id! )
    .subscribe( heroes => {this.heroeSeleccionado = heroe
    }, (err) =>{
      this.hayError = true;
      this.heroes = [];
    })
  }




}
