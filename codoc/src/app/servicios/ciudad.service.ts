import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globales } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient, private globales: Globales) { }

  getCiudades(){
    return this.http.get(this.globales.codocAPI +'ciudades');
  }

  crearCiudad(nombre: string){
    return this.http.post(this.globales.codocAPI +'ciudad', {nombre: nombre});
  }

  actualizarCiudad(id: number, nombre: string){
    return this.http.put(this.globales.codocAPI +'ciudad', {id: id, nombre: nombre});
  }
}