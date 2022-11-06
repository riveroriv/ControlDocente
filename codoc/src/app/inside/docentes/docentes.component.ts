import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocenteService } from 'src/app/servicios/docente.service';
import { DocenteDialogComponent } from '../dialogs/docente-dialog/docente-dialog.component';
import { NewDocenteDialogComponent } from '../dialogs/new-docente-dialog/new-docente-dialog.component';

export interface Docente {
  codigo: number,
  nombre: string,
}

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  
  displayedColumns: string[] = ['codigo', 'nombre'];
  dataSource!: MatTableDataSource<Docente>;
  materiasDocente:any = [];
  duracionSnackBar = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public docenteService: DocenteService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarDocentes();
  }

  filtro(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarDocentes(){
    this.docenteService.getDocentes().subscribe({
      next: (data) => {
        let docentesData: any = data;
        let arrayDocentes: Docente[] = docentesData;
        
        this.dataSource = new MatTableDataSource<Docente>(arrayDocentes.slice());
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
  nuevoDocente(){
    const nuevaMateria = this.dialog.open(NewDocenteDialogComponent);

    nuevaMateria.afterClosed().subscribe(result => {
      try {
        if(result.estado != 0){
          this.snackBar(result.mensaje);
        }
        if(result.estado == 1){
          this.cargarDocentes();
        }
      } catch (error) {}
    });
  }
  editarDocente(docente: Docente){
    const nuevaMateria = this.dialog.open(DocenteDialogComponent, { data: docente });

    nuevaMateria.afterClosed().subscribe(result => {
      try {
        if(result.estado != 0){
          this.snackBar(result.mensaje);
        }
        if(result.estado == 1){
          this.cargarDocentes();
        }
      } catch (error) {}
    });
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: this.duracionSnackBar * 1000,
    });
  }
}
