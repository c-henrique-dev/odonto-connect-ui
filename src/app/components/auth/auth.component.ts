import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';
import { SnackBarService } from '../../services/snack-bar.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ButtonComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
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

    this.authLogin.email = this.authLogin.email;

    this.authService
      .login({ email: this.authLogin.email, password: this.authLogin.password })
      .subscribe({
        next: () => {
          this.router.navigate(['patient/create']);
        },
        error: (erro) => {
          this.snackBarService.open('Usuário ou Senha inválido(s)!');
        },
      });
  }
}
