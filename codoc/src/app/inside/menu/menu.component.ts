import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';
import { PerfilDialogComponent } from '../dialogs/perfil-dialog/perfil-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{
  usuario: string = '';
  isAdmin: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private route: ActivatedRoute, 
    public authService: AuthService, 
    public router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    if(!this.authService.hasToken()){
      this.authService.redirigirOutside();
    }else{
      this.cargarPerfil();
      this.authService.isAdmin().subscribe({
        next: (u) => {
          this.isAdmin = true;
          this.authService.setTipo('1');
        },
        error: (e) => this.authService.setTipo('0')
      });
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  logout(){
    this.authService.logout().subscribe({
      next: (r) => this.salirYBorrarCookies(),
      error: (e)=> this.salirYBorrarCookies()
    });
    
  }

  salirYBorrarCookies(){
    this.authService.deleteToken();
    this.authService.redirigirOutside();
    this.authService.deleteCookies();
  }

  changePassword(){
    const dialogRef = this.dialog.open(PasswordDialogComponent);
    dialogRef.afterClosed().subscribe(() => { });
  }

  openPerfil(){
    const dialogRef = this.dialog.open(PerfilDialogComponent, { minWidth: '30%' });
    dialogRef.afterClosed().subscribe(() => this.cargarPerfil());
  }

  cargarPerfil(){
    this.authService.usuario().subscribe({
      next: (u) => {
        let usuario: any = u;
        this.usuario = usuario.nombre.charAt(0);
      },
      error: (e) => this.authService.redirigirOutside()
    });
  }
}