import { Component } from '@angular/core';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenubarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'odonto-connect-ui';

  constructor(private router: Router, private route: ActivatedRoute) {}

  isLoginPageActive(): boolean {
    return this.router.isActive('/auth/login', true) && this.route.outlet === 'login';
  }
}
