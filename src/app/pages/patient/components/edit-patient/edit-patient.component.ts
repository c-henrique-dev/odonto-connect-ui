import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ButtonComponent } from '../../../../components/button/button.component';
import { NgxMaskDirective } from 'ngx-mask';
import { PatientService } from '../../../../services/patient.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';
import { catchError } from 'rxjs';
import { SnackBarService } from '../../../../services/snack-bar.service';

@Component({
  selector: 'app-edit-patient',
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
    MatDialogModule
  ],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.css',
})
export class EditPatientComponent implements OnInit {
  formPatient!: FormGroup;

  constructor(
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patient: Patient },
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formPatient = this.formBuilder.group({
      name: [this.data.patient.name],
      gender: [this.data.patient.gender],
      telephone: [this.data.patient.telephone],
      email: [this.data.patient.email],
      cpf: [this.data.patient.cpf],
      date_birth: [this.data.patient.date_birth],
      cep: [this.data.patient.address.cep],
      city: [this.data.patient.address.city],
      street: [this.data.patient.address.street],
      number: [this.data.patient.address.number],
    });
  }

  editPatient(payload: Patient) {
    const id = this.data.patient.id;

    if (id != undefined) {
      this.patientService
        .editPatient(payload, id)
        .pipe(
          catchError((error) => {
            this.snackBarService.open(error.error.message);
            return [];
          })
        )
        .subscribe(() => {
          this.snackBarService.open('Paciente atualizado com sucesso!');
          window.location.reload();
        });
    }
  }

  savePatient() {
    const payload: Patient = {
      name: this.formPatient.controls['name'].value,
      gender: this.formPatient.controls['gender'].value,
      telephone: this.formPatient.controls['telephone'].value,
      date_birth: this.formPatient.controls['date_birth'].value,
      address: {
        cep: this.formPatient.controls['cep'].value,
        city: this.formPatient.controls['city'].value,
        number: this.formPatient.controls['number'].value,
        street: this.formPatient.controls['street'].value,
      },
    };
    this.editPatient(payload);
  }
}
