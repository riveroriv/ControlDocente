import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriaService } from 'src/app/servicios/materias.service';

export interface DocenteReporte {
  codigo: number,
  nombre: string,
  materias: number,
  silabo: number,
  parcial_1: number,
  parcial_2: number,
  parcial_3: number,
  nota_1: number,
  nota_2: number,
  nota_3: number,
  planilla: number,
  cumple: number,
  falta: number
}
export interface MateriaReporte {
  codigo: number,
  nombre: string,
  cumplimiento: number,
  silabo: number,
  parcial_1: number,
  parcial_2: number,
  parcial_3: number,
  nota_1: number,
  nota_2: number,
  nota_3: number,
  planilla: number,
  docente: string,
  ciudad: string
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'materias', 'cumple', 'falta', 'silabo', 'parcial_1', 'parcial_2', 'parcial_3', 'nota_1', 'nota_2', 'nota_3', 'planilla'];
  dataSource!: MatTableDataSource<DocenteReporte>;

  displayedColumnsMaterias: string[] = ['codigo', 'nombre', 'cumplimiento', 'silabo', 'parcial_1', 'parcial_2', 'parcial_3', 'nota_1', 'nota_2', 'nota_3', 'planilla'];
  dataSourceMaterias!: MatTableDataSource<MateriaReporte>;

  general = [0, 0,0,0, 0,0,0, 0];
  isAdmin = false;
  
  @ViewChild('paginatorDocentes') paginator!: MatPaginator;
  @ViewChild('docenteSort') sort!: MatSort;

  @ViewChild('paginatorMaterias') paginatorMaterias!: MatPaginator;
  @ViewChild('materiaSort') sortMaterias!: MatSort;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    public materiaService: MateriaService,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarReporteDocentes();
    this.cargarReporteMaterias();
    this.isAdmin = this.authService.getTipo() == "1";
  }
  
  cargarReporteDocentes(){
    this.materiaService.getDocentesReport().subscribe({
      next: (data) => {
        let docentesData: any = data;        
        let docentesReporte: DocenteReporte[] = Array();

        for (const docente of docentesData) {
          const d:DocenteReporte = {
            codigo: docente.codigo,
            nombre: docente.nombre,
            materias: Number(docente.materias),
            silabo: Number(docente.silabo),
            nota_1: Number(docente.nota_1),
            nota_2: Number(docente.nota_2),
            nota_3: Number(docente.nota_3),
            parcial_1: Number(docente.parcial_1),
            parcial_2: Number(docente.parcial_2),
            parcial_3: Number(docente.parcial_3),
            planilla: Number(docente.planilla),
            cumple: 0,
            falta: 0,
          }
          d.cumple = d.silabo + d.planilla + d.nota_1 + d.nota_2 + d.nota_3 + d.parcial_1 + d.parcial_2 + d.parcial_3;
          d.cumple = (d.cumple/8)/d.materias;
          d.falta = 1-d.cumple;
          docentesReporte.push(d);
          this.sumGeneralDocentes(d);
        }

        this.barChartData.datasets[0].data = this.general;
        this.chart?.update();

        this.dataSource = new MatTableDataSource<DocenteReporte>(docentesReporte.slice());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        this.paginator._intl.firstPageLabel = 'Primera';
        this.paginator._intl.itemsPerPageLabel = 'Docentes por página';
        this.paginator._intl.lastPageLabel = 'Última';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Previa';
      }
    });
  }
  cargarReporteMaterias(){
    this.materiaService.getMateriasReport().subscribe({
      next: (data) => {
        let materiasData: any = data;

        this.dataSourceMaterias = new MatTableDataSource<MateriaReporte>(materiasData.slice());
        this.dataSourceMaterias.paginator = this.paginatorMaterias;
        this.dataSourceMaterias.sort = this.sortMaterias;

        this.paginatorMaterias._intl.firstPageLabel = 'Primera';
        this.paginatorMaterias._intl.itemsPerPageLabel = 'Materias por página';
        this.paginatorMaterias._intl.lastPageLabel = 'Última';
        this.paginatorMaterias._intl.nextPageLabel = 'Siguiente';
        this.paginatorMaterias._intl.previousPageLabel = 'Previa';
      }
    });
  }
  

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom'
      }
    }
  }
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Sílabo', 'Parcial 1', 'Parcial 2', 'Parcial 3', 'Notas 1', 'Notas 2', 'Notas 3', 'Planilla' ],
    datasets: [
      { 
        data: this.general,
        backgroundColor: [
          '#673AB7','#FFD740','#F97068','#57C4E5','#48639C','#81F495','#EE8434','#F3DFC1'
      ]
      }
    ]
  }
  sumGeneralDocentes(docente: DocenteReporte){
    this.general[0]+= docente.silabo;
    
    this.general[1]+= docente.parcial_1;
    this.general[2]+= docente.parcial_2;
    this.general[3]+= docente.parcial_3;
    
    this.general[4]+= docente.nota_1;
    this.general[5]+= docente.nota_2;
    this.general[6]+= docente.nota_3;
    
    this.general[7]+= docente.planilla;
  }
  grafico(docente: DocenteReporte){
    this.barChartData.datasets[0].data = [
      docente.silabo,
      docente.parcial_1,
      docente.parcial_2,
      docente.parcial_3,
      docente.nota_1,
      docente.nota_2,
      docente.nota_3, 
      docente.planilla];
    this.chart?.update();
  }
}
