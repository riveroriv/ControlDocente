import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DocenteService } from 'src/app/servicios/docente.service';
import { MateriaService } from 'src/app/servicios/materias.service';

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

  ciudadControl = new FormControl('', [Validators.required]);
  codigoControl = new FormControl('', [Validators.required, Validators.pattern('[A-ZÑa-zñ0-9]{4,}')]);
  nombreControl = new FormControl('', [Validators.required, Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° 0-9]{3,}$")]);
  
  ciudades: Ciudad[] = Array(
    {id: 1, nombre: 'Cochabamba'},
    {id: 2, nombre: 'La Paz'},
    {id: 3, nombre: 'Santa Cruz'}
    );

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    public ciudadService: CiudadService,
    public materiaService: MateriaService,
    public docenteService: DocenteService,
    private dialogRef: MatDialogRef<NewMatetriaDialogComponent>
    ) { }

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
        
        this.paginator._intl.itemsPerPageLabel = 'Docentes por página';
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
    this.codigo = codigo.toUpperCase();
  }
  ciudadAction(ciudadID: number){
    let ciudad = this.ciudades.find( ciudad => ciudad.id == ciudadID);
    if (ciudad == null){
      ciudad = {id: 0, nombre: ''};
    }
    this.ciudad = ciudad;
    console.log(this.ciudad);
  }
  crearMateria(){
    this.materiaService.crearMateria({
      nombre: this.nombre,
      codigo: this.codigo,
      ciudad: this.ciudad.id,
      docente: this.docente.codigo
    }).subscribe({
      next: (v) => {
        this.close('Materia creada', 1);
      },
      error: (e) => {
        this.close('Ha ocurrido un error', 2);
      }
    });
  }
  close(mensaje: string = '', estado: number = 0){
    this.dialogRef.close({mensaje: mensaje, estado: estado});
  } 
}