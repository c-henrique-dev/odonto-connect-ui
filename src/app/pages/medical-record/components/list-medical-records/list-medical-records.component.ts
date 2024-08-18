import { AfterViewInit, Component } from '@angular/core';
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
import { MedicalRecordFilterComponent } from '../medical-record-filter/medical-record-filter.component';
import { CardComponent } from '../../../../components/card/card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from "../../../../components/paginator/paginator.component";
import { DialogService } from '../../../../services/dialog.service';

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
    CardComponent,
    MatPaginatorModule,
    PaginatorComponent,
  ],
  templateUrl: './list-medical-records.component.html',
  styleUrl: './list-medical-records.component.css',
})
export class ListMedicalRecordsComponent implements AfterViewInit {
  medicalRecords!: MedicalRecords;
  inputValue: string = '';
  name!: string;
  start_date!: string;
  end_date!: string;
  padding = '1rem';
  width = '20rem';
  size = 2;
  page = 0;
  totalMedicalRecords!: number;

  constructor(
    private readonly medicalRecordService: MedicalRecordService,
    private readonly dialogService: DialogService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.getMedicalRecords(this.page, this.size);
    });
  }

  getMedicalRecords(size: number, page: number) {
    const adjustedSize = size + 1;
    this.medicalRecordService
      .getMedicalRecords(
        this.name,
        this.start_date,
        this.end_date,
        page,
        adjustedSize
      )
      .subscribe((result) => {
        this.medicalRecords = result;
        this.totalMedicalRecords = result.total;
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

  openDialogFilter() {
    this.dialogService.openDialog(MedicalRecordFilterComponent);
  }
}
