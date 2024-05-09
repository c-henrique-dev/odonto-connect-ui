import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Schedulings } from '../../../../models/schedulings.model';
import { SchedulingService } from '../../../../services/scheduling.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-schedulings',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './list-schedulings.component.html',
  styleUrl: './list-schedulings.component.css',
})
export class ListSchedulingsComponent {
  schedulings!: Schedulings;
  inputValue: string = '';
  name!: string;

  constructor(
    private readonly schedulingService: SchedulingService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.getSchedulings();
    });
  }

  getSchedulings() {
    this.schedulingService.getSchedulings(this.name).subscribe((result) => {
      this.schedulings = result;
    });
  }

  pesquisar() {
    this.router.navigate(['scheduling/list'], {
      queryParams: { name: this.inputValue },
    });
  }
}
