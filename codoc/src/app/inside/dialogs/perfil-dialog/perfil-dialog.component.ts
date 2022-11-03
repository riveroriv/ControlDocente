import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

export interface Usiario {
  codigo: number,
  nombre: string,
  correo: string,
  created_at: string,
  updated_ad: string
}

@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.css']
})
export class PerfilDialogComponent implements OnInit {
  codigo: number = 0;
  nombre: string = '';
  correo: string = '';
  created_at: string = '';
  updated_at: string = '';

  duracionSnackBar = 5;

  constructor(public usuarioService: UsuarioService, private dialogRef: MatDialogRef<PerfilDialogComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioService.usuario().subscribe({
      next: (u) => {
        let usuario: any = u;
        this.codigo = usuario.codigo;
        this.nombre = usuario.nombre;
        this.correo = usuario.correo;
        this.created_at = usuario.created_at;
        this.updated_at = usuario.updated_at;
      },
      error: (e)  => this.close()
    });
  }

  actualizar(nombre: string, correo: string){
    if(nombre.length > 5 ){
      if(this.esEmailValido(correo)){
        this.usuarioService.actualizar(nombre, correo).subscribe({
          next: (r) => {
            this.snackBar('Los cambios se mostrarán cuando actualices');
            this.close();
          },
          error: (e) => this.snackBar('No se pudo cuardar cambio')
        });
      } else{
        this.snackBar('Ingrese un email válido');
      }
    } else{
      this.snackBar('Nombre no válido');
    }
  }
  close(){
    this.dialogRef.close();
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: this.duracionSnackBar * 1000,
    });
  }
  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
}
