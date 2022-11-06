import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globales } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient, private globales: Globales) { }

  
  docenteExiste(codigo: number){
    return this.http.post(this.globales.codocAPI +'docente/existe', {codigo: codigo});
  }

  crearDocente(codigo: number, nombre: string){
    return this.http.post(this.globales.codocAPI +'docente', {codigo: codigo, nombre: nombre});
  }

  getDocentes(){
    return this.http.get(this.globales.codocAPI +'docentes'); 
  }

  actualizarDocente(codigo: number, nombre: string){
    return this.http.put(this.globales.codocAPI +'docente', {codigo: codigo, nombre: nombre});
  }

  eliminarDocente(codigo: number){
    return this.http.delete(this.globales.codocAPI +'docente', {body: {codigo: codigo}});
  }
}