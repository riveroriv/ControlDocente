import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MateriasService } from '../../servicios/materias.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

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
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'silabo', 'parcial_1', 'parcial_2', 'parcial_3', 'nota_1', 'nota_2', 'nota_3', 'planilla', 'ciudad'];
  dataSource!: MatTableDataSource<Materia>;
  materiasDocente:any = [];
  numeroMaterias = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  mensaje = '';
  codigo = 0;

  constructor(private materias:MateriasService, private route: ActivatedRoute, public router: Router) {
    this.codigo = Number(route.snapshot.params['codigo']);
  }
  ngOnInit(): void {
    this.materias.getMateriasDocente(this.codigo).subscribe({
      next: (data) => {
        this.materiasDocente = data;
        let arrayMaterias =  Array();
        for (const materia of this.materiasDocente) {
          this.numeroMaterias++;
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
        if(this.numeroMaterias == 0) {
          this.numeroMaterias = -1;
          this.mensaje = 'No tienes materias asociadas';
        }
        this.dataSource = new MatTableDataSource(arrayMaterias);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        this.router.navigateByUrl('fallo_consulta');
      }
    });
  }

  volver(){
    this.router.navigateByUrl('docente');
  }
  
  filtro(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}