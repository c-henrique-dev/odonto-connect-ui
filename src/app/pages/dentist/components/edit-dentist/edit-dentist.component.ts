import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskDirective } from 'ngx-mask';
import { ButtonComponent } from '../../../../components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DentistService } from '../../../../services/dentist.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { Dentist } from '../../../../models/dentist.model';
import { catchError } from 'rxjs';
import { CardComponent } from "../../../../components/card/card.component";

@Component({
  selector: 'app-edit-dentist',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatStepperModule,
    NgxMaskDirective,
    ButtonComponent,
    MatDialogModule,
    CardComponent
],
  templateUrl: './edit-dentist.component.html',
  styleUrl: './edit-dentist.component.css',
})
export class EditDentistComponent implements OnInit {
  formDentist!: FormGroup;
  width = "550px";
  padding = "1.0rem";

  constructor(
    private dentistService: DentistService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { dentist: Dentist }
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formDentist = this.formBuilder.group({
      name: [this.data.dentist.name],
      specialty: [this.data.dentist.specialty],
      telephone: [this.data.dentist.telephone],
      email: [this.data.dentist.email],
      cpf: [this.data.dentist.cpf],
      cep: [this.data.dentist.address.cep],
      city: [this.data.dentist.address.city],
      street: [this.data.dentist.address.street],
      number: [this.data.dentist.address.number],
    });
  }

  editDentist(payload: Dentist) {
    const id = this.data.dentist.id;

    if (id != undefined) {
      this.dentistService
        .editDentist(payload, id)
        .pipe(
          catchError((error) => {
            this.snackBarService.open(error.error.message);
            return [];
          })
        )
        .subscribe(() => {
          this.snackBarService.open('Dentista atualizado com sucesso!');
          this.dentistService.updateSubjectDentist();
        });
    }
  }

  saveDentist() {
    const payload: Dentist = {
      name: this.formDentist.controls['name'].value,
      telephone: this.formDentist.controls['telephone'].value,
      specialty: this.formDentist.controls['specialty'].value,
      address: {
        cep: this.formDentist.controls['cep'].value,
        city: this.formDentist.controls['city'].value,
        number: this.formDentist.controls['number'].value,
        street: this.formDentist.controls['street'].value,
      },
    };
    this.editDentist(payload);
  }
}
