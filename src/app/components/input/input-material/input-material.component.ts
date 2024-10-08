import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[app-input-material]',
  standalone: true,
  imports: [MatDatepickerModule, FormsModule],
  templateUrl: './input-material.component.html',
  styleUrl: './input-material.component.css'
})
export class InputmaterialComponent {

}
