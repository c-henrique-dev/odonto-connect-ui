import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalRecordsComponent } from './list-medical-records.component';

describe('ListMedicalRecordsComponent', () => {
  let component: ListMedicalRecordsComponent;
  let fixture: ComponentFixture<ListMedicalRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMedicalRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMedicalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
