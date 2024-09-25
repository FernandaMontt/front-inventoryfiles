import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutefileComponent } from './executefile.component';

describe('ExecutefileComponent', () => {
  let component: ExecutefileComponent;
  let fixture: ComponentFixture<ExecutefileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutefileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
