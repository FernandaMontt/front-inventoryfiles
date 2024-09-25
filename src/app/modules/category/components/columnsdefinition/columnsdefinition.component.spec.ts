import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDefinitionsDialog } from './columnsdefinition.component';

describe('ColumnDefinitionsDialog', () => {
  let component: ColumnDefinitionsDialog;
  let fixture: ComponentFixture<ColumnDefinitionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnDefinitionsDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnDefinitionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
