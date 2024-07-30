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
import { SchedulingService } from '../../../../services/scheduling.service';
import { Scheduling } from '../../../../models/scheduling.model';
import { catchError } from 'rxjs';
import { Patient } from '../../../../models/patient.model';
import { PatientService } from '../../../../services/patient.service';
import { Dentist } from '../../../../models/dentist.model';
import { DentistService } from '../../../../services/dentist.service';
import { InputmaterialComponent } from '../../../../components/input/input-material/input-material.component';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-create-scheduling',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    InputmaterialComponent,
    ButtonComponent
  ],
  templateUrl: './create-scheduling.component.html',
  styleUrl: './create-scheduling.component.css',
})
export class CreateSchedulingComponent implements OnInit {
  formScheduling!: FormGroup;
  patients!: Patient[];
  dentists!: Dentist[];

  constructor(
    private schedulingService: SchedulingService,
    private patientService: PatientService,
    private dentistService: DentistService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.listPatients();
    this.listDentists();
  }

  createForm() {
    this.formScheduling = this.formBuilder.group({
      treatment_type: ['', Validators.required],
      date_time: ['', Validators.required],
      dentist_id: ['', Validators.required],
      patient_id: ['', Validators.required],
      comment: ['']
    });
  }

  clearForm() {
    this.formScheduling.reset();
  }

  createScheduling(payload: Scheduling) {
    this.schedulingService
      .createScheduling(payload)
      .pipe(
        catchError((error) => {
          this.snackBarService.open(error.error.message);
          return [];
        })
      )
      .subscribe(() => {
        this.clearForm();
        this.snackBarService.open('Agendamento efetuado com sucesso!');
      });
  }

  saveScheduling() {
    const payload: Scheduling = {
      treatment_type: this.formScheduling.controls['treatment_type'].value,
      comment: this.formScheduling.controls['comment'].value,
      date_time: this.formScheduling.controls['date_time'].value,
      dentist_id: this.formScheduling.controls['dentist_id'].value,
      patient_id: this.formScheduling.controls['patient_id'].value,
    };
    this.createScheduling(payload);
  }

  listPatients() {
    this.patientService.getPatients().subscribe((response) => {
      this.patients = response.data;
    })
  }

  listDentists() {
    this.dentistService.getDentists().subscribe((response) => {
      this.dentists = response.data;
    })
  }
}
