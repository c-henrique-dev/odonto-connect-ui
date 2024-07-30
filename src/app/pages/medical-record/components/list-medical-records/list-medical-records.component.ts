import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from '../../../../services/medical-record.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MedicalRecords } from '../../../../models/medical-records.model';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-medical-records',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './list-medical-records.component.html',
  styleUrl: './list-medical-records.component.css',
})
export class ListMedicalRecordsComponent implements OnInit {
  medicalRecords!: MedicalRecords;
  inputValue: string = '';
  name!: string;

  constructor(
    private readonly medicalRecordService: MedicalRecordService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.getMedicalRecords();
    });
  }

  getMedicalRecords() {
    this.medicalRecordService
      .getMedicalRecords(this.name)
      .subscribe((result) => {
        this.medicalRecords = result;
      });
  }

  generateMedicalRecord(id: number) {
    return this.medicalRecordService
      .generateMedicalRecord(id)
      .subscribe((response) => {
        const fileType = response.type.split('/')[1];

        const blob = new Blob([response]);

        const temporaryUrl = window.URL.createObjectURL(blob);

        const temporaryAnchor = document.createElement('a');
        temporaryAnchor.href = temporaryUrl;

        temporaryAnchor.download = `prontuario.${fileType}`;

        document.body.appendChild(temporaryAnchor);
        temporaryAnchor.click();
        temporaryAnchor.remove();
      });
  }

  pesquisar() {
    this.router.navigate(['medicalRecord/list'], {
      queryParams: { name: this.inputValue },
    });
  }
}
