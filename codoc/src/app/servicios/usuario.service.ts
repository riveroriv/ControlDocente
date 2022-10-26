import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Globales } from '../app.module';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

export interface Usuario {
  codigo:number,
  nombre:string,
  correo:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private cookies: CookieService, private globales: Globales, public router: Router) { }

  registrar(usuario: Usuario){
    return this.http.post(this.globales.codocAPI +"registrar", usuario);
  }

  listar(){
    return this.http.get(this.globales.codocAPI +"usuarios");
  }

  actualizar(nombre: string, correo: string){
    return this.http.put(this.globales.codocAPI +"usuario", {nombre: nombre, correo: correo});
  }

  eliminar(codigo: number){
    return this.http.delete(this.globales.codocAPI +"usuario/"+codigo);
  }

  cambiarPassword(password: string){
    return this.http.put(this.globales.codocAPI +"cambiarPassword", {password: password});
  }

  cambiarPasswordAdmin(password: string, usuario:number){
    return this.http.put(this.globales.codocAPI +"cambiarPasswordAdmin", {password: password, usuario: usuario});
  }

}
