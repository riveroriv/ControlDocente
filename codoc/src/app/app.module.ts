import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './inside/home/home.component';
import { LoginComponent } from './outside/login/login.component';
import { DocenteComponent } from './outside/docente/docente.component';
import { ErrorComponent } from './error/error.component';
import { ConsultaComponent } from './outside/consulta/consulta.component';

import { NavexteriorComponent } from './outside/navexterior/navexterior.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MenuComponent } from './inside/menu/menu.component';
import { MateriasComponent } from './inside/materias/materias.component';
import { DocentesComponent } from './inside/docentes/docentes.component';
import { ReportesComponent } from './inside/reportes/reportes.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MateriaDialogComponent } from './inside/dialogs/materia-dialog/materia-dialog.component';
import { SettingsComponent } from './inside/settings/settings.component';
import { UsuariosComponent } from './inside/usuarios/usuarios.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const rutas:Routes = [
  {path:'', component:MenuComponent, 
    children: [
      {path:'home', component: HomeComponent},
      {path:'materias', component: MateriasComponent},
      {path:'docentes', component: DocentesComponent},
      {path:'reportes', component: ReportesComponent},
      {path:'ajustes', component: SettingsComponent},
      {path:'usuarios', component: UsuariosComponent}
    ]},
  {path:'login', component:LoginComponent},
  {path:'docente', component:DocenteComponent},
  {path:'consulta/:id', component:ConsultaComponent},
  
  
  {path:'**', component:ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocenteComponent,
    ConsultaComponent,
    ErrorComponent,
    HomeComponent,
    NavexteriorComponent,
    MenuComponent,
    MateriasComponent,
    DocentesComponent,
    ReportesComponent,
    MateriaDialogComponent,
    SettingsComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),

    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  httl:string = 'hola';
}
