import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DocenteService } from 'src/app/servicios/docente.service';
import { MateriaService } from 'src/app/servicios/materias.service';
import { Materia } from '../../materias/materias.component';

export interface Ciudad {
  id: number,
  nombre: string
}
export interface Docente {
  codigo: number,
  nombre: string
}

@Component({
  selector: 'app-materia-dialog',
  templateUrl: './materia-dialog.component.html',
  styleUrls: ['./materia-dialog.component.css']
})

export class MateriaDialogComponent implements OnInit {

  displayedColumns = ['codigo', 'nombre'];
  dataSource!: MatTableDataSource<Docente>;
  docente: Docente = {codigo:0, nombre:''};
  ciudad: Ciudad = {id:0, nombre: ''};
  codigo: string = '';
  nombre: string = '';
  ciudades: Ciudad[] = Array({id: 1, nombre: 'Cochabamba'}, {id: 2, nombre: 'La Paz'}, {id: 3, nombre: 'Santa Cruz'});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public materia: Materia,
    public materiaService: MateriaService,
    public ciudadService: CiudadService,
    public docenteService: DocenteService,
    private dialogRef: MatDialogRef<MateriaDialogComponent>
    ) { }

  ngOnInit(): void {
    this.docente = {codigo: this.materia.id_docente, nombre: this.materia.docente};
    this.ciudad = {id: this.materia.id_ciudad, nombre: this.materia.ciudad};
    this.codigo = this.materia.codigo;
    this.nombre = this.materia.nombre;

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
  ciudadAction(ciudad: Ciudad){
    this.ciudad = ciudad;
  }
  eliminarMateria(){
    this.materiaService.eliminarMateria(this.codigo).subscribe({
      next: (v) => this.close('Materia eliminada', 1),
      error: (e) => this.close('Ha ocurrido un error', 2)
    });
  }
  actualizarMateria(){
    if(this.nombre.length < 3){
      this.close('Nombre muy corto',2);
    } else{
      this.materiaService.actualizarInfoMateria({
        codigo: this.codigo,
        nombre: this.nombre,
        ciudad: this.ciudad.id,
        docente: this.docente.codigo
      }).subscribe({
        next: (v) => this.close('Materia actualizada', 1),
        error: (e) => this.close('Ha ocurrido un error', 2)
      });
    }
  }
  close(mensaje: string = '', estado: number = 0){
    this.dialogRef.close({mensaje: mensaje, estado: estado});
  }
}