import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompartirDefinicionDialog } from './modalcompartirdefinicion.component';

describe('ModalCompartirDefinicionDialog', () => {
  let component: ModalCompartirDefinicionDialog;
  let fixture: ComponentFixture<ModalCompartirDefinicionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCompartirDefinicionDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCompartirDefinicionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
