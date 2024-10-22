import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-crossoverdefinition',
  templateUrl: './crossoverdefinition.component.html',
  styleUrls: ['./crossoverdefinition.component.css']
})
export class CrossoverDefinitionModalComponent implements OnInit{
  crossoverForm: FormGroup;
  fieldAOptions = ['A.Column 1', 'A.Column 2']; // Opciones del Field A
  fieldBOptions = ['B.Column 3', 'B.Column 4']; // Opciones del Field B
  operatorOptions = ['>', '<', '+', '-', '=', '<>']; // Operadores disponibles
  displayedColumns!: string[];
  constructor(
    public dialogRef: MatDialogRef<CrossoverDefinitionModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.crossoverForm = this.fb.group({
      description: ['', Validators.required],
      element1: ['', Validators.required],
      operator: ['', Validators.required],
      element2: ['', Validators.required],
      tolerance: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  

  onSubmit(): void {
    if (this.crossoverForm.valid) {
      this.dialogRef.close(this.crossoverForm.value); // Cierra el modal y envía los datos
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
