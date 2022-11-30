import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/interface.heroes';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

// restricciones para imagen,
//si el valor.alt_img no existe, entoces...


  transform(value: Heroe):string {
    if( !value.id && !value.alt_img){
      return 'assets/no-image.png';
    }else if(value.alt_img){
      return value.alt_img;
    } else{
      return (value)
    ? `assets/heroes/${value.id}.jpg`
    : `{{heroe.alter_ego}}`;
    }
  }

}
