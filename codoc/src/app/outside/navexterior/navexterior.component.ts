import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navexterior',
  templateUrl: './navexterior.component.html',
  styleUrls: ['./navexterior.component.css']
})
export class NavexteriorComponent {

  constructor(private router:Router) {}

  goLogin(){
    this.router.navigateByUrl('login');
  }
  goDocente(){
    this.router.navigateByUrl('docente');
  }
  
}
