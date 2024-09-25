import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesCreateComponent } from './filescreate.component';

describe('FilesCreateComponent', () => {
  let component: FilesCreateComponent;
  let fixture: ComponentFixture<FilesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
