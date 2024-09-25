import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-columnsdefinitionB',
  templateUrl: './columnsdefinitionB.component.html',
  styleUrls: ['./columnsdefinitionB.component.css']
})
export class ColumnDefinitionsDialogB implements OnInit{
  displayedColumns!: string[];
  constructor(
    public dialogRef: MatDialogRef<ColumnDefinitionsDialogB>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.data.showBActions = true;
    this.displayedColumns = this.data.showBActions
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
