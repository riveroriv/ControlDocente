import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocenteService } from 'src/app/servicios/docente.service';

@Component({
  selector: 'app-new-docente-dialog',
  templateUrl: './new-docente-dialog.component.html',
  styleUrls: ['./new-docente-dialog.component.css']
})

export class NewDocenteDialogComponent{

  constructor(
    public docenteService: DocenteService,
    private dialogRef: MatDialogRef<NewDocenteDialogComponent>
    ) { }

  close(mensaje: string = '', estado: number = 0){
    this.dialogRef.close({mensaje: mensaje, estado: estado});
  }

  nuevoDocente(nombre: string, codigo: string){
    if(!Number.isInteger(Number(codigo))){
      this.close('Código no válido', 3);
    } else{
      if(nombre.length < 5){
        this.close('Nombre muy corto', 3);
      } else{
        this.docenteService.crearDocente(parseInt(codigo), nombre).subscribe({
          next: (v) => {
            this.close('Docentea añadido', 1);
          },
          error: (e) => {
            this.close(e.error.message, 2);
          }
        });
      }
    }
  }
}