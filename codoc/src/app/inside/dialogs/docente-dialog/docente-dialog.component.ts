import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DocenteService } from 'src/app/servicios/docente.service';
import { Docente } from '../materia-dialog/materia-dialog.component';

@Component({
  selector: 'app-docente-dialog',
  templateUrl: './docente-dialog.component.html',
  styleUrls: ['./docente-dialog.component.css']
})

export class DocenteDialogComponent implements OnInit{

  isAdmin = false;

  constructor(
    public docenteService: DocenteService,
    public authSerice: AuthService,
    private dialogRef: MatDialogRef<DocenteDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public docente: Docente
    ) { }

  ngOnInit(): void {
    this.isAdmin = this.authSerice.getTipo() == "1";
  }

  close(mensaje: string = '', estado: number = 0){
    this.dialogRef.close({mensaje: mensaje, estado: estado});
  }

  actualizarDocente(nombre: string){
    if(nombre.length < 5){
      this.close('Nombre muy corto', 3);
    } else{
      this.docenteService.actualizarDocente( this.docente.codigo, nombre).subscribe({
        next: (v) => {
          this.close('Cambio guardado', 1);
        },
        error: (e) => {
          this.close(e.error.message, 2);
        }
      });
    }
  }
  eliminarDocente(){
    this.docenteService.eliminarDocente(this.docente.codigo).subscribe({
      next: (v) => {
        this.close('Docente eliminado', 1);
      },
      error: (e) => {
        this.close(e.error.message, 2);
      }
    });
  }
}