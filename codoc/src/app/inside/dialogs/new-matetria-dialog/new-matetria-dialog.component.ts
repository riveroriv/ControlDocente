import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DocenteService } from 'src/app/servicios/docente.service';
import { MateriasService } from 'src/app/servicios/materias.service';

export interface Ciudad {
  id: number,
  nombre: string
}
export interface Docente {
  codigo: number,
  nombre: string
}

@Component({
  selector: 'app-new-matetria-dialog',
  templateUrl: './new-matetria-dialog.component.html',
  styleUrls: ['./new-matetria-dialog.component.css']
})
export class NewMatetriaDialogComponent implements OnInit {
  
  displayedColumns = ['codigo', 'nombre'];
  dataSource!: MatTableDataSource<Docente>;

  docente: Docente = {codigo:0, nombre:''};
  ciudad: Ciudad = {id:0, nombre: ''};
  codigo: string = '';
  nombre: string = '';

  ciudades: Ciudad[] = Array({id: 1, nombre: 'Cochabamba'}, {id: 2, nombre: 'La Paz'}, {id: 3, nombre: 'Santa Cruz'});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public ciudadService: CiudadService, public materiaService: MateriasService, public docenteService: DocenteService, private dialogRef: MatDialogRef<NewMatetriaDialogComponent>) {
    
  }

  ngOnInit(): void {
    this.ciudadService.getCiudades().subscribe({
      next: (data) => {
        let c: any = data;
        this.ciudades = c;
      }
    });
    this.docenteService.getDocentes().subscribe({
      next: (data) => {
        let d: any = data;
        this.dataSource = new MatTableDataSource<Docente>(d);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        this.paginator._intl.itemsPerPageLabel = 'Número de materias';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Previa';
      },
      error: () => {
        //close y dialog de problema
      }
    });
  }
  filtro(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  elegirDocente(docente: Docente){
    this.docente = docente;   
  }
  nombreAction(nombre: string){
    this.nombre = nombre;
  }
  codigoAction(codigo: string){
    this.codigo = codigo;

  }
  ciudadAction(ciudad: Ciudad){
    this.ciudad = ciudad;
  }
  crearMateria(){
    this.materiaService.crearMateria({
      nombre: this.nombre,
      codigo: this.codigo,
      ciudad: this.ciudad.id,
      docente: this.docente.codigo
    }).subscribe({
      next: (v) => {
        this.close(true);
      },
      error: (e) => {
        this.close(false);
      }
    });
  }
  close(funciono: boolean){
    this.dialogRef.close(funciono);
  }
  
}
