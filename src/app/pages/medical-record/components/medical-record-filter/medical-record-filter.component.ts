import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterComponent } from '../../../../components/filter/filter.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-medical-record-filter',
  standalone: true,
  imports: [
    FilterComponent,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './medical-record-filter.component.html',
  styleUrl: './medical-record-filter.component.css',
})
export class MedicalRecordFilterComponent {
  filterText = 'Informe uma data inicial e final';
  startDate!: string;
  endDate!: string;
  constructor(private router: Router) {}

  filter() {
    const queryParams: any = {};

    if (this.startDate) {
      queryParams.start_date = new Date(this.startDate).toISOString().split('T')[0];
    }

    if (this.endDate) {
      queryParams.end_date = new Date(this.endDate).toISOString().split('T')[0];
    }

    this.router.navigate(['medicalRecord/list'], {
      queryParams: queryParams,
    });
  }

  filterClear() {
    this.router.navigate(['medicalRecord/list'], {
      queryParams: {},
    });
    this.startDate = '';
    this.endDate = '';
  }
}
