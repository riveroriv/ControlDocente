import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { isEmpty, map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  seccion: string = 'Home';
  usuario: string = '';
  isAdmin: boolean = false;

  setSeccion(sesccion:string){
    this.seccion=sesccion;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private route: ActivatedRoute, 
    public authService: AuthService, 
    public router: Router,
    public dialog: MatDialog
    ) {
    if(!this.authService.hasToken()){
      this.authService.redirigirOutside();
    }
    this.authService.usuario().subscribe({
      next: (u) => {
        let usuario: any = u;
        this.usuario = usuario.nombre.charAt(0);
      },
      error: (e) => this.authService.redirigirOutside()
    });
    this.authService.isAdmin().subscribe({
      next: (u) => {
        this.isAdmin = true;
      }
    });
  }
  
  logout(){
    this.authService.logout().subscribe();
    this.authService.deleteToken();
    this.authService.redirigirOutside();
  }

  changePassword(){
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
