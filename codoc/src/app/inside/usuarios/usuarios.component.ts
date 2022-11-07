import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AdminPasswordDialogComponent } from '../dialogs/admin-password-dialog/admin-password-dialog.component';
import { NewUsuarioDialogComponent } from '../dialogs/new-usuario-dialog/new-usuario-dialog.component';

export interface Usuario {
  codigo: number,
  nombre: string,
  correo: string,
  tipo: number
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'correo', 'tipo', 'opciones'];
  dataSource!: MatTableDataSource<Usuario>;//cambia esto

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public authService: AuthService,
    public usuarioService: UsuarioService,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    if(this.authService.getTipo() !== "1"){
      this.router.navigateByUrl('');
      this.snackBar('No autorizado');
    } else {
      this.cargarUsuarios();
    }
  }
  snackBar(message: string){
    this._snackBar.open(message, 'Cerrar', {
      duration: 5 * 1000,
    });
  }
  filtro(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cambiarTipo(codigo: number, tipo: number){
    tipo = tipo > 0 ? 0 : 1;
    this.usuarioService.cambiarTipo(codigo, tipo).subscribe({
      next: (v) => {
        this.snackBar('Permiso cambiado');
        this.cargarUsuarios();
      },
      error: (e) => this.snackBar(e.error.message)
    });
  }
  eliminar(usuario: Usuario){
    this.usuarioService.eliminar(usuario.codigo).subscribe({
      next: (v) => {
        this.snackBar('Usuario eliminado');
        this.cargarUsuarios();
      },
      
      error: (e) => this.snackBar(e.error.message)
    });
  }
  nuevoUsuario(){
    const nuevoUsuario = this.dialog.open(NewUsuarioDialogComponent);

    nuevoUsuario.afterClosed().subscribe(result => {
      try {
        if(result.estado != 0){
          this.snackBar(result.mensaje);
        }
        if(result.estado == 1){
          this.cargarUsuarios();
        }
      } catch (error) {}
    });
  }
  cambiarPassword(usuario: Usuario){
    const cambiarPassword = this.dialog.open(AdminPasswordDialogComponent, {data: usuario});

    cambiarPassword.afterClosed().subscribe(result => {
      try {
        if(result.estado != 0){
          this.snackBar(result.mensaje);
        }
        if(result.estado == 1){
          this.cargarUsuarios();
        }
      } catch (error) {}
    });
  }
  cargarUsuarios(){
    this.usuarioService.listar().subscribe({
      next: (data) => {
        let usuariosData: any = data;
        let arrayUsuarios: Usuario[] = usuariosData;
        
        this.dataSource = new MatTableDataSource<Usuario>(arrayUsuarios.slice());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.paginator._intl.firstPageLabel = 'Primera';
        this.paginator._intl.itemsPerPageLabel = 'Usuarios por página';
        this.paginator._intl.lastPageLabel = 'Última';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Previa';
      }
    });
  }
}
