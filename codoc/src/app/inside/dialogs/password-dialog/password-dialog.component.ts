import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  hide = true;
  duracionSnackBar = 5;
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor(private _snackBar: MatSnackBar, public usuarioService: UsuarioService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  cambiar(password: string) {
    if(this.passwordControl.status == 'VALID'){
      this.usuarioService.cambiarPassword(password).subscribe({
        next: (v) => {
          this.snackBar('Contraseña actualizada');
          this.authService.logoutAll().subscribe();
          this.authService.redirigirOutside();
        },
        error: (e) => this.snackBar('No se pudo cambiar la contraseña')
      });
    }else{
      this.snackBar('Contraseña no válida');
    }
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: this.duracionSnackBar * 1000,
    });
  }
}
