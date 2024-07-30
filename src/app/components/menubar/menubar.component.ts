import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    MatListModule,
    RouterModule,
    MatAccordion,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    LoadingComponent,
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
  estaLogado: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.usuarioEstaLogado().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }

  sair() {
    this.authService.sair();
    this.router.navigate(['login']);
  }
}
