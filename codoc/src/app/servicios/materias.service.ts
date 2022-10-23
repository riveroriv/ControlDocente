import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http:HttpClient) { }
  getMateriasDocente( codigo:number ){
    let url='http://127.0.0.1:8000/api/materias/'+ codigo;
    return this.http.get(url);
  }
  getCiudades(){
    let ciudades = new Map();
    let url='http://127.0.0.1:8000/api/ciudades';
    return this.http.get(url);
  }
}
