import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  onPageChange(event: {pageIndex: number, pageSize: number}) {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}
