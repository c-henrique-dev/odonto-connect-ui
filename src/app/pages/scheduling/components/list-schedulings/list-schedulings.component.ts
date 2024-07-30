import { Component, inject, OnInit } from '@angular/core';
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
    PaymentStatusPipe
  ],
  templateUrl: './list-schedulings.component.html',
  styleUrl: './list-schedulings.component.css',
})
export class ListSchedulingsComponent implements OnInit {
  schedulings!: Schedulings;
  inputValue: string = '';
  name!: string;
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly schedulingService: SchedulingService,
    private router: Router,
    private snackBarService: SnackBarService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.getSchedulings();
    });
  }

  openDialog(scheduling: Scheduling) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { scheduling };

    this.dialog.open(DetailsSchedulingComponent, dialogConfig);
  }

  openDialogPayment(scheduling: Schedulings) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { scheduling };

    this.dialog.open(CreatePaymentComponent, dialogConfig);
  }

  getSchedulings() {
    this.schedulingService.getSchedulings(this.name).subscribe((result) => {
      this.schedulings = result;
    });
  }

  cancelScheduling(id: number | undefined) {
    console.log(id);
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
