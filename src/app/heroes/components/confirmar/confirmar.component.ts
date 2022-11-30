import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/interface.heroes';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe) { }
      //Inject, almacena los datos en la propiedad "data"
      // Y los datos serán de tipo Heroe
  ngOnInit(): void {

  }

borrar(){
  this.dialogRef.close(true);

}

cerrar(){
  this.dialogRef.close();
}

}
