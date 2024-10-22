import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-modalcompartirdefinicion',
  templateUrl: './modalcompartirdefinicion.component.html',
  styleUrls: ['./modalcompartirdefinicion.component.css']
})
export class ModalCompartirDefinicionDialog implements OnInit{
  displayedColumns!: string[];
  constructor(
    public dialogRef: MatDialogRef<ModalCompartirDefinicionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {users: User[]}
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  sharePermissions() {
    const permissions = this.data.users.map((user: User) => ({
      id: user.id,
      canRead: user.canRead,
      canExecute: user.canExecute,
      canWrite: user.canWrite,
    }));
    
    console.log('Permisos compartidos:', permissions);
    // Aquí puedes procesar la lógica para guardar los permisos
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface User {
  id: number;
  name: string;
  canRead: boolean;
  canExecute: boolean;
  canWrite: boolean;
}
