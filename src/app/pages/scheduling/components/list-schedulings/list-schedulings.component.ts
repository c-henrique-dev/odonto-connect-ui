import { AfterViewInit, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Schedulings } from '../../../../models/schedulings.model';
import { SchedulingService } from '../../../../services/scheduling.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { DetailsSchedulingComponent } from '../details-scheduling/details-scheduling.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Scheduling } from '../../../../models/scheduling.model';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { CreatePaymentComponent } from '../../../payment/components/create-payment/create-payment.component';
import { PaymentStatusPipe } from '../../../../../pipes/payment-status.pipe';
import { SchedulingFilterComponent } from '../scheduling-filter/scheduling-filter.component';
import { FilterComponent } from '../../../../components/filter/filter.component';
import { CardComponent } from '../../../../components/card/card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from "../../../../components/paginator/paginator.component";

@Component({
  selector: 'app-list-schedulings',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    PaymentStatusPipe,
    FilterComponent,
    MatPaginatorModule,
    CardComponent,
    PaginatorComponent
],
  templateUrl: './list-schedulings.component.html',
  styleUrl: './list-schedulings.component.css',
})
export class ListSchedulingsComponent implements AfterViewInit {
  schedulings!: Schedulings;
  inputValue: string = '';
  name!: string;
  status!: string;
  paymentStatus!: string;
  startDate!: string;
  endDate!: string;
  padding = '1rem';
  width = '20rem';
  totalSchedulings!: number;
  size = 2;
  page = 0;
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly schedulingService: SchedulingService,
    private router: Router,
    private snackBarService: SnackBarService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngAfterViewInit() {
      this.activatedRouter.queryParams.subscribe((params) => {
        this.name = params['name'];
        this.status = params['status'];
        this.paymentStatus = params['payment_status'];
        this.startDate = params['start_date'];
        this.endDate = params['end_date'];
        this.getSchedulings(this.page, this.size);
      });
  }
  
  openDialogDetails(scheduling: Scheduling) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { scheduling };

    this.dialog.open(DetailsSchedulingComponent, dialogConfig);
  }

  openDialogFilter() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(SchedulingFilterComponent, dialogConfig);
  }

  openDialogPayment(scheduling: Schedulings) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { scheduling };

    this.dialog.open(CreatePaymentComponent, dialogConfig);
  }

  getSchedulings(size: number, page: number) {
    const adjustedSize = size + 1;
    this.schedulingService
      .getSchedulings(
        this.name,
        this.status,
        this.paymentStatus,
        this.startDate,
        this.endDate,
        page,
        adjustedSize
      )
      .subscribe((result) => {
        this.schedulings = result;
        this.totalSchedulings = result.total;
      });
  }

  cancelScheduling(id: number | undefined) {
    if (id !== undefined) {
      this.schedulingService.cancelScheduling(id).subscribe(() => {
        this.snackBarService.open('Agendamento cancelado com sucesso!');
      });
    }
  }

  pesquisar() {
    this.router.navigate(['scheduling/list'], {
      queryParams: { name: this.inputValue },
    });
  }
}
