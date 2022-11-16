import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navexterior',
  templateUrl: './navexterior.component.html',
  styleUrls: ['./navexterior.component.css']
})
export class NavexteriorComponent {

  constructor(
    private router:Router,
    public authService: AuthService
    ) {
    /*
    if(this.authService.hasToken()){
      //dialog
      console.log(this.authService.hasToken());
      this.authService.redirigirInside();
    }
    */
  }

  goLogin(){
    this.router.navigateByUrl('login');
  }
  goDocente(){
    this.router.navigateByUrl('docente');
  }
  
}