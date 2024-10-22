import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossoverDefinitionModalComponent } from './crossoverdefinition.component';

describe('CrossoverDefinitionModalComponent', () => {
  let component: CrossoverDefinitionModalComponent;
  let fixture: ComponentFixture<CrossoverDefinitionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossoverDefinitionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossoverDefinitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
