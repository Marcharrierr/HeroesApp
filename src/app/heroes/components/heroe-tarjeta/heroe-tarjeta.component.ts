import { Component, Input, } from '@angular/core';
import { Heroe } from '../../interfaces/interface.heroes';


@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles:[`
  mat-card{
    margin-top:25px
  }
  `]
})
export class HeroeTarjetaComponent  {

@Input() heroe!: Heroe ;




}
