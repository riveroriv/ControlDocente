import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  codigoControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{4,}')]);
  passwordControl = new FormControl('', [Validators.required]);
  duracionSnackBar = 4;

  constructor(public authService: AuthService, public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(codigo: string, password: string) {
    if ( this.codigoControl.status == 'INVALID' || this.passwordControl.status == 'INVALID' ){
     this.snackBar('Credenciales no válidos');
    } else {
      const credenciales = {codigo: Number(codigo), password: password};
      this.authService.login(credenciales).subscribe(
        data => {
          this.authService.setToken(data.access_token);
          this.router.navigateByUrl('');
        },
        error => {
          this.snackBar(error.error.message);
        });
    }
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: this.duracionSnackBar * 1000,
    });
  }
}