import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Globales } from '../app.module';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

export interface Usuario {
  codigo:number,
  password:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient, private cookies: CookieService, private globales: Globales, public router: Router) { }

  login(user: Usuario): Observable<any>{
    return this.http.post(this.globales.codocAPI +"login", user);
  }
  setToken(token: string) {
    this.cookies.set("access_token", token);
  }
  getToken() {
    return this.cookies.get("access_token");
  }
  deleteToken() {
    this.cookies.delete('access_token');
  }

  logout() {
    return this.http.post(this.globales.codocAPI + 'logout', {});
  }
  logoutAll() {
    return this.http.post(this.globales.codocAPI + 'logout/all', {});
  }
  usuario() {
    return this.http.get(this.globales.codocAPI + 'usuario');
  }
  isAdmin() {
    return this.http.post(this.globales.codocAPI + 'isAdmin', {});
  }

  setTipo(tipo: string){
    this.cookies.set("tipo", tipo);
  }
  getTipo(){
    return this.cookies.get("tipo");
  }
  deleteTipo(){
    this.cookies.delete("tipo");
  }
  deleteCookies(){
    this.cookies.deleteAll();
  }

  hasTipo(): boolean {
    return this.getTipo() != '';
  }
  hasToken(): boolean{
    return this.getToken() != '';
  }
  redirigirOutside() {
      this.deleteToken();
      this.router.navigateByUrl('login');
  }

  redirigirInside() {
    this.router.navigateByUrl('');
}
}