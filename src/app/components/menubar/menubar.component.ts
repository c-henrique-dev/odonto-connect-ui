import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    MatIconModule,
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
  estaLogado: boolean = false;
  profileImageUrl: string = 'assets/login.svg';

  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onUploadClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

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
