import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDentistsComponent } from './list-dentists.component';

describe('ListDentistsComponent', () => {
  let component: ListDentistsComponent;
  let fixture: ComponentFixture<ListDentistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDentistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDentistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
