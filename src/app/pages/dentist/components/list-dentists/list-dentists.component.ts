import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Dentist } from '../../../../models/dentist.model';
import { DentistService } from '../../../../services/dentist.service';
import { EditDentistComponent } from '../edit-dentist/edit-dentist.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TelephonePipe } from '../../../../../pipes/telephone.pipe';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-list-dentists',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TelephonePipe,
  ],
  templateUrl: './list-dentists.component.html',
  styleUrl: './list-dentists.component.css',
})
export class ListDentistsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'specialty',
    'telephone',
    'editar',
    'excluir',
  ];
  dataSource = new MatTableDataSource<Dentist>();
  dentists: Dentist[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly dentistService: DentistService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.dentistService.updateSubjectDentist();
    this.loadDentistTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(dentist: Dentist) {
    this.dialogService.openDialog(EditDentistComponent, { dentist });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDentistTable() {
    this.dentistService.getSubjectDentist().subscribe((dentist) => {
      this.dataSource.data = dentist;
    });
  }

  deleteDentist(id: number | undefined) {
    if (id != undefined) {
      this.dentistService.deleteDentist(id).subscribe(() => {
        this.dentistService.updateSubjectDentist();
      });
    }
  }
}
