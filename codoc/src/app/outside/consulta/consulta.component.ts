import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriasService } from '../../servicios/materias.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
  cumplidos = [0,0,0,0,0,0,0,0];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  mensaje = '';
  codigo = 0;
  display = '';

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
          this.sumCumplido(m);
        }
        this.barChartData.datasets[0].data = this.cumplidos;
        this.chart?.update();
        if(this.numeroMaterias == 0) {
          this.numeroMaterias = -1;
          this.mensaje = 'No tienes materias asociadas';
          this.display = 'no-display';
        }
        this.dataSource = new MatTableDataSource<Materia>(arrayMaterias);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.paginator._intl.firstPageLabel = 'Primera';
        this.paginator._intl.itemsPerPageLabel = 'Número de materias';
        this.paginator._intl.lastPageLabel = 'última';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
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

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ 'SB', 'P1', 'P2', 'P3', 'N1', 'N2', 'N3', 'PL' ],
    datasets: [
      { 
        data: this.cumplidos,
        label: 'Completado' ,
        backgroundColor: [ '#673ab7' ]
      },
    ]
  };

  public sumCumplido(materia: Materia){
    this.cumplidos[0] += materia.silabo;
    this.cumplidos[1] += materia.nota_1;
    this.cumplidos[2] += materia.nota_2;
    this.cumplidos[3] += materia.nota_3;
    this.cumplidos[4] += materia.parcial_1;
    this.cumplidos[5] += materia.parcial_2;
    this.cumplidos[6] += materia.parcial_3;
    this.cumplidos[7] += materia.planilla;
  }
}