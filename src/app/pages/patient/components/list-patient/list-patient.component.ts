import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../../../../services/patient.service';
import { Patient } from '../../../../models/patient.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css',
})
export class ListPatientComponent implements OnInit {
  patients: Patient[] = [];

  constructor(
    private readonly patientService: PatientService,
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe((result) => {
      this.patients = result.data;
    });
  }
}
