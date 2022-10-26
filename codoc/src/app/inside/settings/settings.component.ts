import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public authService: AuthService) {
    this.authService.isAdmin().subscribe({
      error: (e) => this.authService.redirigirInside()
    });
  }

  ngOnInit(): void {
  }

}
