import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public ciudadService: CiudadService,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if(this.authService.getTipo() !== "1"){
      this.router.navigateByUrl('');
      this.snackBar('No autorizado');
    } else {
      this.cargarCiudades();
    }
  }
  cargarCiudades(){
    this.ciudadService.getCiudades().subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: 5 * 1000,
    });
  }
}
