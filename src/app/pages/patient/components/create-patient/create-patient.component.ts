import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PatientService } from '../../../../services/patient.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../../../models/patient.model';
import { catchError } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskDirective } from 'ngx-mask';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-create-patient',
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
    ButtonComponent
  ],
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css',
})
export class CreatePatientComponent implements OnInit {
  formPatient!: FormGroup;
  formAddress!: FormGroup;
  
  constructor(
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formPatient = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      date_birth: ['', Validators.required],
    });

    this.formAddress = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      cep: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  createPatient(payload: Patient) {
    this.patientService
      .createPatient(payload)
      .pipe(
        catchError((error) => {
          this.snackBarService.open(error.error.message);
          return [];
        })
      )
      .subscribe(() => {
        this.snackBarService.open('Paciente cadastrado com sucesso!');
      });
  }

  savePatient() {
      const payload: Patient = {
        name: this.formPatient.controls['name'].value,
        email: this.formPatient.controls['email'].value,
        gender: this.formPatient.controls['gender'].value,
        telephone: this.formPatient.controls['telephone'].value,
        cpf: this.formPatient.controls['cpf'].value,
        date_birth: this.formPatient.controls['date_birth'].value,
        address: {
          city: this.formAddress.controls['city'].value,
          street: this.formAddress.controls['street'].value,
          cep: this.formAddress.controls['cep'].value,
          number: this.formAddress.controls['number'].value,
        }
      };
      this.createPatient(payload);
    }
  }

