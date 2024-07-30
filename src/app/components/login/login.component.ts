import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../button/button.component';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authLogin!: Login;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  login() {
    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);

    this.authService
      .login({ email: this.authLogin.email, password: this.authLogin.password })
      .subscribe({
        next: () => {
          this.router.navigate(['patient/create']);
        },
        error: () => {
          this.snackBarService.open('Usuário ou Senha inválido(s)!');
        },
      });
  }
}
