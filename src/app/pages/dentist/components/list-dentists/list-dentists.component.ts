import { Component, inject } from '@angular/core';
import { Dentist } from '../../../../models/dentist.model';
import { DentistService } from '../../../../services/dentist.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDentistComponent } from '../edit-dentist/edit-dentist.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-dentists',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './list-dentists.component.html',
  styleUrl: './list-dentists.component.css',
})
export class ListDentistsComponent {
  dentists: Dentist[] = [];
  readonly dialog = inject(MatDialog);

  openDialog(dentist: Dentist) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { dentist };

    this.dialog.open(EditDentistComponent, dialogConfig);
  }

  constructor(private readonly dentistService: DentistService) {}

  ngOnInit(): void {
    this.getDentists();
  }

  getDentists() {
    this.dentistService.getDentists().subscribe((result) => {
      this.dentists = result.data;
    });
  }

  deleteDentist(id: number | undefined) {
    if (id != undefined) {
      this.dentistService.deleteDentist(id).subscribe((result) => {
        this.getDentists();
      });
    }
  }
}
