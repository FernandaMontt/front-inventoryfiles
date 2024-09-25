import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfilesComponent } from './newfiles.component';

describe('NewfilesComponent', () => {
  let component: NewfilesComponent;
  let fixture: ComponentFixture<NewfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
