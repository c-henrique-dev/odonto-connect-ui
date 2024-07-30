import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PatientService } from '../../../../services/patient.service';
import { Patient } from '../../../../models/patient.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TelephonePipe } from '../../../../../pipes/telephone.pipe';
import { CpfPipe } from '../../../../../pipes/cpf.pipe';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule,
    TelephonePipe,
    CpfPipe
  ],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css',
})
export class ListPatientComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'name', 'email', 'telephone', 'date_birth', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<Patient>();
  patients: Patient[] = [];
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(patient: Patient) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { patient };

    this.dialog.open(EditPatientComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getPatients() {
    this.patientService.getPatients().subscribe((result) => {
      this.patients = result.data;
      this.dataSource.data = this.patients;
    });
  }

  deletePatient(id: number | undefined) {
    if (id != undefined) {
      this.patientService.deletePatient(id).subscribe(() => {
        this.getPatients();
      });
    }
  }
}
