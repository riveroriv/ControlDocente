import { AfterViewInit, Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MateriasService } from '../../servicios/materias.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { MateriaDialogComponent } from '../dialogs/materia-dialog/materia-dialog.component';


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
const ELEMENT_DATA: Materia[] = [
];

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements OnInit {
  buscarPor = 'nombre';
  displayedColumns: string[] = ['codigo', 'nombre', 'silabo', 'parcial_1', 'parcial_2', 'parcial_3', 'nota_1', 'nota_2', 'nota_3', 'planilla', 'ciudad', 'editar'];
  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new MateriaDataSource(this.dataToDisplay);
  sortedData: Materia[];
  materiasDocente:any = [];

  constructor(private materias:MateriasService, public dialog: MatDialog) {
    this.sortedData = this.dataToDisplay.slice();
  }

  openDialog() {
    const dialogRef = this.dialog.open(MateriaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.materias.getMateriasDocente(42000).subscribe(data=>{
      this.materiasDocente = data;
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
      this.dataToDisplay = [...this.dataToDisplay, m];
      this.dataSource.setData(this.dataToDisplay);
      }
    });
  }

  sortData(sort: Sort){
    return this.sortedData;
    const data = this.dataToDisplay.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'codigo':
          return compare(a.codigo, b.codigo, isAsc);
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'silabo':
          return compare(a.silabo, b.silabo, isAsc);
        case 'p1':
          return compare(a.parcial_1, b.parcial_1, isAsc);
        case 'p2':
          return compare(a.parcial_2, b.parcial_2, isAsc);
        default:
          return 0;
      }
    });
    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
class MateriaDataSource extends DataSource<Materia> {
  private _dataStream = new ReplaySubject<Materia[]>();

  constructor(initialData: Materia[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Materia[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Materia[]) {
    this._dataStream.next(data);
  }
}
