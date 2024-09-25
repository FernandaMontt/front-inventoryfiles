import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDefinitionsDialogB } from './columnsdefinitionB.component';

describe('ColumnDefinitionsDialogB', () => {
  let component: ColumnDefinitionsDialogB;
  let fixture: ComponentFixture<ColumnDefinitionsDialogB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnDefinitionsDialogB ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnDefinitionsDialogB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
