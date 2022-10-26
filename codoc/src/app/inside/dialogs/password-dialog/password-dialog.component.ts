import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cambiar(password: string) {
    if(this.passwordControl.status == 'VALID'){
      
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
