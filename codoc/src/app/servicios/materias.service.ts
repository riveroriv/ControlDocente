import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../app.module';

export interface Materia {
  codigo: string,
  nombre: string,
  docente: number,
  ciudad: number
}

@Injectable({
  providedIn: 'root'
})

export class MateriasService {

  constructor(private http:HttpClient, private globales: Globales) { }

  getMateriasDocente( codigo: number ){
    return this.http.get(this.globales.codocAPI +'materias/docente', {params: {codigo:codigo}});
  }

  getMateriasUsuario(){
    return this.http.get(this.globales.codocAPI +'materias');
  }

  getMateriasTodas(){
    return this.http.get(this.globales.codocAPI +'materias/all');
  }

  getMateria(codigo: string){
    return this.http.get(this.globales.codocAPI +'materia', {params: {codigo: codigo}});
  }

  crearMateria(materia: Materia){
    return this.http.post(this.globales.codocAPI +'materia', materia);
  }

  actualizarInfoMateria(materia: Materia){
    return this.http.put(this.globales.codocAPI +'materia', materia);
  }

  actualizarCampoMateria(codigo: string, campo: number, valor: number){
    return this.http.patch(this.globales.codocAPI +'materia', {codigo: codigo, campo: campo, valor: valor});
  }

  eliminarMateria(codigo: string){
    return this.http.delete(this.globales.codocAPI +'materia', {body: {codigo: codigo}});
  }
}
