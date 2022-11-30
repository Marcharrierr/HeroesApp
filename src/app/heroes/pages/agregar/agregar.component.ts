import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/interface.heroes';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 10%
  }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.DCComics
  }

  constructor(private heroesService: HeroesService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
    //segundo private para leer URL

    //verificado de URL id
  ngOnInit(): void {
//si la url actual (editar/agregar personaje), no incluye
  //no devuelve nada, si lo incluye, activa la petición de agregar el id
    if(!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe (
      switchMap(({id})=> this.heroesService.getHeroePorId(id)))
    .subscribe( heroe =>  this.heroe = heroe);


  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){

    return;
    }
    if(this.heroe.id){
      //actualizar registro
      this.heroesService.actualizarHeroe(this.heroe)
      // Actualiza url automáticamente cuando se lanza el botón guardar
      // Mostrando objeto modificado actualizado
      .subscribe(heroeActualizado =>
        //Función de flecha con cuerpo
        {this.heroe = heroeActualizado,
         this.mostrarSnackbar('Registro actualizado exitosamente!')} )
    }else{
      //crear registro

      //guardar datos desde botón a bbdd
         this.heroesService.agregarHeroe(this.heroe)
         .subscribe(heroe => {
           this.router.navigate(['/heroes/editar', heroe.id]),
           this.mostrarSnackbar('Registro agregado exitosamente!');
         })
    }

  }

borrar(){
//Dialog
const dialog = this.dialog.open(ConfirmarComponent, {
  width: '400px',
  data: {...this.heroe} //Resguarda la data para que no cambie
})

dialog.afterClosed().subscribe(
  (result => {
    if(result){
    this.heroesService.borrarHeroe(this.heroe.id!)
    .subscribe(resp => {
      this.router.navigate(['/heroes']);
    })}
  })
)

  //borrar registro

}

//Snackbar configuration
mostrarSnackbar(mensaje: string){
  this.snackBar.open(mensaje, 'cerrar', {
    duration: 3000
  });
}


}
