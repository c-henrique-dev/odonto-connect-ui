import { Component, Inject, OnInit } from '@angular/core';
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
import { ButtonComponent } from '../../../../components/button/button.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { PaymentService } from '../../../../services/payment.service';
import { Payment } from '../../../../models/payment.model';
import { catchError } from 'rxjs';
import { Schedulings } from '../../../../models/schedulings.model';

@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatButtonModule,
    ButtonComponent,
  ],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.css',
})
export class CreatePaymentComponent implements OnInit {
  formPayment!: FormGroup;

  constructor(
    private paymentService: PaymentService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { scheduling: Schedulings }
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formPayment = this.formBuilder.group({
      payment_date: ['', Validators.required],
      amount: ['', Validators.required],
      payment_reason: ['', Validators.required],
    });
  }

  createPayment(payload: Payment) {
    this.paymentService
      .createPayment(payload)
      .pipe(
        catchError((error) => {
          this.snackBarService.open(error.error.message);
          return [];
        })
      )
      .subscribe(() => {
        this.snackBarService.open('Pagamento efetuado com sucesso!');
      });
  }

  savePayment() {
    const payload: Payment = {
      patient_id: this.data.scheduling.data[0].patient.id,
      scheduling_id: this.data.scheduling.data[0].id,
      payment_date: this.formPayment.controls['payment_date'].value,
      amount: this.formPayment.controls['amount'].value,
      payment_reason: this.formPayment.controls['payment_reason'].value,
    };
    
    this.createPayment(payload);
  }
}
