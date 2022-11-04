import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './inside/home/home.component';
import { LoginComponent } from './outside/login/login.component';
import { DocenteComponent } from './outside/docente/docente.component';
import { ErrorComponent } from './error/error.component';
import { ConsultaComponent } from './outside/consulta/consulta.component';

import { NavexteriorComponent } from './outside/navexterior/navexterior.component';
import { MateriasComponent } from './inside/materias/materias.component';
import { DocentesComponent } from './inside/docentes/docentes.component';
import { ReportesComponent } from './inside/reportes/reportes.component';
import { MateriaDialogComponent } from './inside/dialogs/materia-dialog/materia-dialog.component';
import { SettingsComponent } from './inside/settings/settings.component';
import { UsuariosComponent } from './inside/usuarios/usuarios.component';
import { PasswordDialogComponent } from './inside/dialogs/password-dialog/password-dialog.component';
import { PerfilDialogComponent } from './inside/dialogs/perfil-dialog/perfil-dialog.component';
import { NewMatetriaDialogComponent } from './inside/dialogs/new-matetria-dialog/new-matetria-dialog.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './servicios/token-interceptor.service';

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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';

const rutas:Routes = [
  {path:'', component:MenuComponent, 
    children: [
      {path: '', component: MateriasComponent, pathMatch: 'full'},
      {path:'informacion', component: HomeComponent},
      {path:'materias', component: MateriasComponent},
      {path:'docentes', component: DocentesComponent},
      {path:'reportes', component: ReportesComponent},
      {path:'ajustes', component: SettingsComponent},
      {path:'usuarios', component: UsuariosComponent}
    ]},
  {path:'login', component:LoginComponent},
  {path:'docente', component:DocenteComponent},
  {path:'consulta/:codigo', component:ConsultaComponent},
  
  
  {path:'**', component:ErrorComponent}
];

export class Globales {
  readonly codocAPI:string = 'http://127.0.0.1:8000/api/';
}

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
    PasswordDialogComponent,
    PerfilDialogComponent,
    NewMatetriaDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    NgChartsModule,

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
    MatCheckboxModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatStepperModule
  ],
  providers: [
    Globales,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  httl:string = 'hola';
}
