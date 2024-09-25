import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-newfiles',
  templateUrl: './newfiles.component.html',
  styleUrls: ['./newfiles.component.css']
})
export class NewfilesComponent implements OnInit{

  public categoryForm: FormGroup;
  estadoFormulario: string = "";
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
              private dialogRef: MatDialogRef<NewfilesComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any){

    console.log(data);
    this.estadoFormulario = "Agregar";

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_creacion: ['',Validators.required],
      creador: ['', Validators.required],
      fecha_actualizacion: ['', Validators.required],
      version: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      
  }

  onSave(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value,
      fecha_creacion: this.categoryForm.get('fecha_creacion')?.value,
      creador: this.categoryForm.get('creador')?.value,
      fecha_actualizacion: this.categoryForm.get('fecha_actualizacion')?.value,
      version: this.categoryForm.get('version')?.value,
      estado: this.categoryForm.get('estado')?.value
    }

      //create
      this.categoryService.saveCategorie(data)
        .subscribe((data:any) => {
          console.log(data);
          this.dialogRef.close(1);
        }, (error:any) => {
          this.dialogRef.close(2);
        })


  }

  onCancel(){
    this.dialogRef.close(3);
  }

  

}
