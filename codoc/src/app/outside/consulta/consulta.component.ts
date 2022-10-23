import { AfterViewInit, Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MateriasService } from '../../servicios/materias.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Materia {
  codigo:number;
  nombre:string;
  silabo:boolean;
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
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'silabo', 'parcial_1', 'parcial_2', 'parcial_1', 'nota_1', 'nota_2', 'nota_3', 'planilla', 'ciudad'];
  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new MateriaDataSource(this.dataToDisplay);

  materiasDocente:any = [];

  constructor(private materias:MateriasService) {
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