import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MateriasService } from '../../servicios/materias.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { MateriaDialogComponent } from '../dialogs/materia-dialog/materia-dialog.component';
import {MatPaginator} from '@angular/material/paginator';


export interface Materia {
  codigo:number;
  nombre:string;
  silabo:number;
  parcial_1:number;
  parcial_2:number;
  parcial_3:number;
  nota_1:number;
  nota_2:number;
  nota_3:number;
  planilla:number;
  ciudad:string;
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements AfterViewInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'silabo', 'parcial_1', 'parcial_2', 'parcial_3', 'nota_1', 'nota_2', 'nota_3', 'planilla', 'ciudad', 'editar'];
  dataSource!: MatTableDataSource<Materia>;
  materiasDocente:any = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private materias:MateriasService, public dialog: MatDialog) {
    this.materias.getMateriasDocente(42000).subscribe(data=>{
      this.materiasDocente = data;
      let arrayMaterias =  Array();
      for (const materia of this.materiasDocente) {
       const m:Materia = { 
          codigo: materia.codigo,
          nombre: materia.nombre,
          silabo: materia.silabo,
          parcial_1: materia.parcial_1,
          parcial_2: materia.parcial_2,
          parcial_3: materia.parcial_3,
          nota_1: materia.nota_1,
          nota_2: materia.nota_2,
          nota_3: materia.nota_3,
          planilla: materia.planilla,
          ciudad: materia.ciudad,
        };
        arrayMaterias.push(m);
      }
      this.dataSource = new MatTableDataSource(arrayMaterias);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(MateriaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  filtro(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

