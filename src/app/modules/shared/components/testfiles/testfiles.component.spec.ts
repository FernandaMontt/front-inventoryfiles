import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfilesComponent } from './testfiles.component';

describe('TestfilesComponent', () => {
  let component: TestfilesComponent;
  let fixture: ComponentFixture<TestfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
