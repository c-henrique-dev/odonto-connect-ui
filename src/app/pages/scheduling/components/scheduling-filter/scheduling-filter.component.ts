import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterComponent } from '../../../../components/filter/filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-scheduling-filter',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    FilterComponent,
  ],
  templateUrl: './scheduling-filter.component.html',
  styleUrl: './scheduling-filter.component.css',
})
export class SchedulingFilterComponent {
  status!: string;
  name!: string;
  paymentStatus!: string;
  startDate!: string;
  endDate!: string;
  filterText =
    'Você pode filtrar pela intervalo da data, status ou status do pagamento';
  constructor(private router: Router) {}

  filter() {
    const queryParams: any = {};

    if (this.status) {
      queryParams.status = this.status;
    }

    if (this.paymentStatus) {
      queryParams.payment_status = this.paymentStatus;
    }

    if (this.startDate) {
      queryParams.start_date = new Date(this.startDate)
        .toISOString()
        .split('T')[0];
    }

    if (this.endDate) {
      queryParams.end_date = new Date(this.endDate).toISOString().split('T')[0];
    }

    this.router.navigate(['scheduling/list'], {
      queryParams: queryParams,
    });
  }

  filterClear() {
    this.router.navigate(['scheduling/list'], {
      queryParams: {},
    });
    this.status = '';
    this.paymentStatus = '';
    this.startDate = '';
    this.endDate = '';
  }
}
