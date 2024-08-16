import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatSelectModule, ButtonComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Input() filterText!: string;
  @Output() filtrar = new EventEmitter<void>();
  @Output() limpar = new EventEmitter<void>();

  onFilter() {
    this.filtrar.emit();
  }

  onClear() {
    this.limpar.emit();
  }
}
