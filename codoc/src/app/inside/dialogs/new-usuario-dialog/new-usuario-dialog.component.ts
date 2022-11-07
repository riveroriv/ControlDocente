import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-new-usuario-dialog',
  templateUrl: './new-usuario-dialog.component.html',
  styleUrls: ['./new-usuario-dialog.component.css']
})
export class NewUsuarioDialogComponent implements OnInit {

  codigoControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{4,}')]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nombreControl = new FormControl('', [Validators.required, Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{5,}$")]);

  constructor(
    public usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<NewUsuarioDialogComponent>
    ) { }

  ngOnInit(): void {
  }
  close(mensaje: string = '', estado: number = 0){
    this.dialogRef.close({mensaje: mensaje, estado: estado});
  }
  nuevoUsuario(codigo: string, nombre: string, email: string){
    if(this.codigoControl.status == 'VALID'){
      if(this.nombreControl.status == 'VALID'){
        if(this.emailControl.status == 'VALID'){
          this.usuarioService.registrar({
            codigo: Number(codigo),
            correo: email,
            nombre: nombre,
            password: 'upb321upb'
          }).subscribe({
            next: (v) => this.close('Usuario creado', 1),
            error: (e) => this.close('No se creó el usuario',2)
          });
        }
      }
    }
  }
}
