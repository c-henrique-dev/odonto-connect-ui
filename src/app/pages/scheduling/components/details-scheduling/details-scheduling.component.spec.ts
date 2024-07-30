import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSchedulingComponent } from './details-scheduling.component';

describe('DetailsSchedulingComponent', () => {
  let component: DetailsSchedulingComponent;
  let fixture: ComponentFixture<DetailsSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSchedulingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
