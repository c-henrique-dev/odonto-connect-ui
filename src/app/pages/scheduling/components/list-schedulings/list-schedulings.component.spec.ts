import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchedulingsComponent } from './list-schedulings.component';

describe('ListSchedulingsComponent', () => {
  let component: ListSchedulingsComponent;
  let fixture: ComponentFixture<ListSchedulingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSchedulingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSchedulingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
