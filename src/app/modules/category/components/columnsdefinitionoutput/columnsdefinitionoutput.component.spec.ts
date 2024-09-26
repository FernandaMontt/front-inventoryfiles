import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDefinitionsDialogOutput } from './columnsdefinitionoutput.component';

describe('ColumnDefinitionsDialogOutput', () => {
  let component: ColumnDefinitionsDialogOutput;
  let fixture: ComponentFixture<ColumnDefinitionsDialogOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnDefinitionsDialogOutput ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnDefinitionsDialogOutput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
