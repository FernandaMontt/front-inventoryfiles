import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComparacionComponent } from './new-comparacion.component';

describe('NewComparacionComponent', () => {
  let component: NewComparacionComponent;
  let fixture: ComponentFixture<NewComparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComparacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
