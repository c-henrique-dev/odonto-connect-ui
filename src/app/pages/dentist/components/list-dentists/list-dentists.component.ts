import { Component } from '@angular/core';
import { Dentist } from '../../../../models/dentist.model';
import { DentistService } from '../../../../services/dentist.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-dentists',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './list-dentists.component.html',
  styleUrl: './list-dentists.component.css'
})
export class ListDentistsComponent {
  dentists: Dentist[] = [];

  constructor(
    private readonly dentistService: DentistService,
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.dentistService.getDentists().subscribe((result) => {
      this.dentists = result.data;
    });
  }

}
