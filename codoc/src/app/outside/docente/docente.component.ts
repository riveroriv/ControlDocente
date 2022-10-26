import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DocenteService } from 'src/app/servicios/docente.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
 
  hide = true;
  codigoControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{4,}')]);
  duracionSnackBar: number = 3;

  constructor(private docenteServicio: DocenteService, public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  consultar(codigo:string){
    if ( this.codigoControl.status == 'INVALID' ){
      this.snackBar('Código no válido');
    } else {
        this.docenteServicio.docenteExiste(Number(codigo)).subscribe(
          data => {
            this.router.navigateByUrl('consulta/'+codigo);
          },
          error => {
            this.snackBar('Docente no encotrado');
          }
        );
      }
  }

  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: this.duracionSnackBar * 1000,
    });
  }

}
