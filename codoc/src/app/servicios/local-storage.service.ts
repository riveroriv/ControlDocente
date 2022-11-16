import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  set(key: string, value: any){
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Hubo un problema con el almacenamiento local');
    }
  }
  get(key: string){
    const value = localStorage.getItem(key);
    if( value == null ){
      return null;
    }
    return JSON.parse(value);
  }
  clear(){
    localStorage.clear();
  }
}
