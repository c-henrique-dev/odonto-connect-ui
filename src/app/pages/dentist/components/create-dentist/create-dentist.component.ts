import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { DentistService } from '../../../../services/dentist.service';
import { Dentist } from '../../../../models/dentist.model';
import { catchError } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskDirective } from 'ngx-mask';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-create-dentist',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatStepperModule,
    NgxMaskDirective,
    ButtonComponent,
  ],
  templateUrl: './create-dentist.component.html',
  styleUrl: './create-dentist.component.css',
})
export class CreateDentistComponent implements OnInit {
  formDentist!: FormGroup;
  formAddress!: FormGroup;

  constructor(
    private dentistService: DentistService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formDentist = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialty: ['', Validators.required],
    });

    this.formAddress = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      cep: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  clearForm() {
    this.formDentist.reset();
  }

  createDentist(payload: Dentist) {
    this.dentistService
      .createDentist(payload)
      .pipe(
        catchError((error) => {
          this.snackBarService.open(error.error.message);
          return [];
        })
      )
      .subscribe(() => {
        this.clearForm();
        this.snackBarService.open('Dentista cadastrado com sucesso!');
      });
  }

  saveDentist() {
    const payload: Dentist = {
      name: this.formDentist.controls['name'].value,
      cpf: this.formDentist.controls['cpf'].value,
      specialty: this.formDentist.controls['specialty'].value,
      email: this.formDentist.controls['email'].value,
      telephone: this.formDentist.controls['telephone'].value,
      address: {
        city: this.formAddress.controls['city'].value,
        street: this.formAddress.controls['street'].value,
        cep: this.formAddress.controls['cep'].value,
        number: this.formAddress.controls['number'].value,
      },
    };
    this.createDentist(payload);
  }
}
