import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/interface.heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 10px;
  }
  `]
})
export class HeroeComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }

  heroe!     : Heroe;

  ngOnInit(): void {
   this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroesService.getHeroePorId(id) ),
    ).subscribe( heroe => this.heroe = heroe);

    this.scrollTop();
  }

  scrollTop() {
    var scrollElem= document.querySelector('#moveTop');
    scrollElem!.scrollIntoView();
  }

btnRegresar(){
  this.router.navigate(['/heroes/listado']);
}




}
