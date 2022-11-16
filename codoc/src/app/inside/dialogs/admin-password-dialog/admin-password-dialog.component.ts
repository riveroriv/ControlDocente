import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../../usuarios/usuarios.component';

@Component({
  selector: 'app-admin-password-dialog',
  templateUrl: './admin-password-dialog.component.html',
  styleUrls: ['./admin-password-dialog.component.css']
})

export class AdminPasswordDialogComponent implements OnInit {

  passwordControl = new FormControl('', [
    Validators.required, 
    Validators.pattern(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/)
  ]);

  constructor(
    public usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<AdminPasswordDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario
  ) { }

  ngOnInit(): void {
  }

  close(mensaje: string = '', estado: number = 0){
    this.dialogRef.close({mensaje: mensaje, estado: estado});
  }

  cambiarPassword(newPassword: string){
    if(this.passwordControl.status == 'VALID'){
      this.usuarioService.cambiarPasswordAdmin(newPassword, this.usuario.codigo).subscribe({
        next: (v) => this.close('Contraseña actualizada', 1),
        error: (e) => {this.close('No se pudo guardar el cambio', 2)}
      });
    }
  }
}