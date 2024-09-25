import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-columnsdefinition',
  templateUrl: './columnsdefinition.component.html',
  styleUrls: ['./columnsdefinition.component.css']
})
export class ColumnDefinitionsDialog implements OnInit{
  displayedColumns!: string[];
  constructor(
    public dialogRef: MatDialogRef<ColumnDefinitionsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.data.showActions = true;
    this.displayedColumns = this.data.showActions
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
