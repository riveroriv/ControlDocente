import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if(this.authService.getTipo() !== "1"){
      this.router.navigateByUrl('');
      this.snackBar('No autorizado');
    }
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: 5 * 1000,
    });
  }
}
