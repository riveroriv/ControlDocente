import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      error: (e) => this.authService.redirigirInside()
    });
  }

}
