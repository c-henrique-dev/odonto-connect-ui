import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../../../../services/patient.service';
import { Patient } from '../../../../models/patient.model';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css',
})
export class ListPatientComponent implements OnInit {
  patients: Patient[] = [];
  readonly dialog = inject(MatDialog);

  openDialog(patient: Patient) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { patient };

    this.dialog.open(EditPatientComponent, dialogConfig);
  }

  constructor(private readonly patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe((result) => {
      this.patients = result.data;
    });
  }

  deletePatient(id: number | undefined) {
    if (id != undefined) {
      this.patientService.deletePatient(id).subscribe((result) => {
        this.getPatients();
      });
    }
  }
}
