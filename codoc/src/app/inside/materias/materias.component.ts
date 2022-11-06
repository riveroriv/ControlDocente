import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriaService } from '../../servicios/materias.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { MateriaDialogComponent } from '../dialogs/materia-dialog/materia-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import { NewMatetriaDialogComponent } from '../dialogs/new-matetria-dialog/new-matetria-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Materia {
  codigo:string;
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
  docente:string;
  id_docente:number;
  id_ciudad:number;
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'silabo', 'parcial_1', 'parcial_2', 'parcial_3', 'nota_1', 'nota_2', 'nota_3', 'planilla', 'docente', 'ciudad', 'editar'];
  dataSource!: MatTableDataSource<Materia>;
  materiasDocente:any = [];
  duracionSnackBar = 5;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public materias:MateriaService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  editarMateria(materia: Materia) {
    const dialogRef = this.dialog.open(MateriaDialogComponent, { data: materia });

    dialogRef.afterClosed().subscribe(result => {
      if(result.estado != 0){
        this.snackBar(result.mensaje);
      }
      if(result.estado == 1){
        this.cargarMaterias();
      }
    });
  }

  nuevaMateria(){
    const nuevaMateria = this.dialog.open(NewMatetriaDialogComponent);

    nuevaMateria.afterClosed().subscribe(result => {
      if(result.estado != 0){
        this.snackBar(result.mensaje);
      }
      if(result.estado == 1){
        this.cargarMaterias();
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
  cargarMaterias(){
    this.materias.getMateriasUsuario().subscribe(data=>{
      this.materiasDocente = data;
      let arrayMaterias =  Array();
      for (const materia of this.materiasDocente) {
        const m:Materia = { 
          codigo: materia.codigo,
          nombre: materia.nombre.toLowerCase(),
          silabo: materia.silabo,
          parcial_1: materia.parcial_1,
          parcial_2: materia.parcial_2,
          parcial_3: materia.parcial_3,
          nota_1: materia.nota_1,
          nota_2: materia.nota_2,
          nota_3: materia.nota_3,
          planilla: materia.planilla,
          ciudad: materia.ciudad,
          docente: materia.docente,
          id_ciudad: materia.id_ciudad,
          id_docente: materia.id_docente,
        };
        arrayMaterias.push(m);
      }
      this.dataSource = new MatTableDataSource<Materia>(arrayMaterias.slice());
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.paginator._intl.firstPageLabel = 'Primera';
      this.paginator._intl.itemsPerPageLabel = 'Número de materias';
      this.paginator._intl.lastPageLabel = 'Última';
      this.paginator._intl.nextPageLabel = 'Siguiente';
      this.paginator._intl.previousPageLabel = 'Previa';
    });
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: this.duracionSnackBar * 1000,
    });
  }
  cambiar(materia: Materia, campo: number, valorAntiguo: number){
    let valor:number = valorAntiguo == 0? 1: 0;
    this.materias.actualizarCampoMateria(materia.codigo, campo , valor).subscribe({
      next: (v) => this.setValueMateria(materia, valor, campo),
      error: (e) => this.snackBar('Ha ocurrido un error')
    });
  }
  setValueMateria(materia: Materia, value: number, campo: number){
    switch(campo){
      case 0: materia.silabo = value;
      break;
      case 1: materia.parcial_1 = value;
      break;
      case 2: materia.parcial_2 = value;
      break;
      case 3: materia.parcial_3 = value;
      break;
      case 4: materia.nota_1 = value;
      break;
      case 5: materia.nota_2 = value;
      break;
      case 6: materia.nota_3 = value;
      break;
      case 7: materia.planilla = value;
      break;
      default:
      break;
    }
  }
}

