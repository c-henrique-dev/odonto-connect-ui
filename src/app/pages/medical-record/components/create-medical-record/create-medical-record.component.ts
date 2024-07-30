import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { MedicalRecordService } from '../../../../services/medical-record.service';
import { catchError } from 'rxjs';
import { MedicalRecord } from '../../../../models/medical-record.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PatientService } from '../../../../services/patient.service';
import { Patient } from '../../../../models/patient.model';
import { MatIconModule } from '@angular/material/icon';
import { InputmaterialComponent } from '../../../../components/input/input-material/input-material.component';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-create-medical-record',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    InputmaterialComponent,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './create-medical-record.component.html',
  styleUrl: './create-medical-record.component.css',
})
export class CreateMedicalRecordComponent implements OnInit {
  formMedicalRecord!: FormGroup;
  patients!: Patient[];
  selectedFile!: File;

  constructor(
    private medicalRecordService: MedicalRecordService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.listPatients();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  createForm() {
    this.formMedicalRecord = this.formBuilder.group({
      record_date: ['', Validators.required],
      description: ['', Validators.required],
      patient_id: ['', Validators.required],
      attachment: ['', Validators.required],
    });
  }

  clearForm() {
    this.formMedicalRecord.reset();
  }

  createMedicalRecord(payload: MedicalRecord) {
    const formData = new FormData();
    formData.append('description', payload.description);
    formData.append('patient_id', payload.patient_id);
    formData.append('record_date', payload.record_date);
    formData.append('attachment', payload.attachment);

    this.medicalRecordService
      .createMedicalRecord(formData)
      .pipe(
        catchError((error) => {
          this.snackBarService.open(error.error.message);
          return [];
        })
      )
      .subscribe(() => {
        this.clearForm();
        this.snackBarService.open('Prontuário cadastrado com sucesso!');
      });
  }

  saveMedicalRecord() {
    const payload: MedicalRecord = {
      description: this.formMedicalRecord.controls['description'].value,
      patient_id: this.formMedicalRecord.controls['patient_id'].value,
      record_date: this.formMedicalRecord.controls['record_date'].value,
      attachment: this.selectedFile,
    };

    this.createMedicalRecord(payload);
  }

  listPatients() {
    this.patientService.getPatients().subscribe((response) => {
      this.patients = response.data;
    });
  }
}
