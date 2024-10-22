import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-columnsdefinitionoutput',
  templateUrl: './columnsdefinitionoutput.component.html',
  styleUrls: ['./columnsdefinitionoutput.component.css']
})
export class ColumnDefinitionsDialogOutput implements OnInit{
  displayedColumns!: string[];
  optionTitles: string[] = ['A = B', 'A not B', 'B not A'];
  constructor(
    public dialogRef: MatDialogRef<ColumnDefinitionsDialogOutput>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.data.showOutActions = true;
    this.displayedColumns = this.data.showOutActions
    ? ['columnName', 'columnType', 'columnUnique', 'actions']
    : ['columnName', 'columnType', 'columnUnique'];

  // Asigna displayedColumns a los datos
  this.data.displayedColumns = this.displayedColumns;
  }

  onEdit(column: any) {
    // Implementa la lógica para editar la columna
  }

  onDelete(column: any) {
    // Implementa la lógica para eliminar la columna
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
