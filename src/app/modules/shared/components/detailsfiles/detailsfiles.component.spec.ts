import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFilesComponent } from './detailsfiles.component';

describe('DetailFilesComponent', () => {
  let component: DetailFilesComponent;
  let fixture: ComponentFixture<DetailFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
