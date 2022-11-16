import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, Usuario } from 'src/app/servicios/auth.service';
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
  created_at: string = '';
  updated_at: string = '';

  duracionSnackBar = 5;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nombreControl = new FormControl('', [Validators.required, Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{5,}$")]);

  constructor(
    public usuarioService: UsuarioService,
    public authService: AuthService,
    private dialogRef: MatDialogRef<PerfilDialogComponent>,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.usuarioService.usuario().subscribe({
      next: (u) => {
        let usuario: any = u;
        this.codigo = usuario.codigo;
        this.created_at = usuario.created_at;
        this.updated_at = usuario.updated_at;
        this.nombreControl.setValue(usuario.nombre);
        this.emailControl.setValue(usuario.correo);
      },
      error: (e)  => this.close()
    });
  }

  actualizar(nombre: string, correo: string){
    if(this.nombreControl.status == 'VALID'){
      if(this.emailControl.status == 'VALID'){
        this.usuarioService.actualizar(nombre, correo).subscribe({
          next: (r) => {
            this.snackBar('Cambios guardados');
            this.close();
          },
          error: (e) => this.snackBar('No se pudo cuardar cambio')
        });
      }
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

  logoutAll(){
    this.authService.logoutAll().subscribe({
      next: (r) => this.salirYBorrarCookies(),
      error: (e)=> this.salirYBorrarCookies()
    });
  }

  salirYBorrarCookies(){
    this.authService.deleteToken();
    this.authService.redirigirOutside();
    this.authService.deleteCookies();
  }
}