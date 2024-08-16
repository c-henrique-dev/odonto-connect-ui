import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordFilterComponent } from './medical-record-filter.component';

describe('MedicalRecordFilterComponent', () => {
  let component: MedicalRecordFilterComponent;
  let fixture: ComponentFixture<MedicalRecordFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalRecordFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalRecordFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
