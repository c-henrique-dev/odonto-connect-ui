import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';
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
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent {
  estaLogado: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuarioEstaLogado().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }

}
