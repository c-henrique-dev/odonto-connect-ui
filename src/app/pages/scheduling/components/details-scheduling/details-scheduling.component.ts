import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Scheduling } from '../../../../models/scheduling.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-scheduling',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './details-scheduling.component.html',
  styleUrl: './details-scheduling.component.css',
})
export class DetailsSchedulingComponent implements OnInit {
  formScheduling!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { scheduling: Scheduling }
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formScheduling = this.formBuilder.group({
      comment: [this.data.scheduling.comment],
      treatment_type: [this.data.scheduling.treatment_type],
    });
  }
}
