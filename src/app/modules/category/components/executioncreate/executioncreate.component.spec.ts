import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionCreateComponent } from './executioncreate.component';

describe('ExecutionCreateComponent', () => {
  let component: ExecutionCreateComponent;
  let fixture: ComponentFixture<ExecutionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
