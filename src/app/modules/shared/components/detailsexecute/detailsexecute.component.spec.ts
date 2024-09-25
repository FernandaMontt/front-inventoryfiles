import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExecuteComponent } from './detailsexecute.component';

describe('DetailExecuteComponent', () => {
  let component: DetailExecuteComponent;
  let fixture: ComponentFixture<DetailExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailExecuteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
