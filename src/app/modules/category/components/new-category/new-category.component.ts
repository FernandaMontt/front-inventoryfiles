import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  public categoryForm: FormGroup;
  estadoFormulario: string = "";
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
              private dialogRef: MatDialogRef<NewCategoryComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any){

    console.log(data);
    this.estadoFormulario = "Agregar";

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      creador: ['', Validators.required],
      fecha_actualizacion: ['', Validators.required],
      version: ['', Validators.required]
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

  ngOnInit(): void {
      
  }

  onSave(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value,
      creador: this.categoryForm.get('creador')?.value,
      fecha_actualizacion: this.categoryForm.get('fecha_actualizacion')?.value,
      version: this.categoryForm.get('version')?.value
    }

    if(this.data != null){
      //update
      this.categoryService.updateCategorie(data, this.data.id)
        .subscribe((data:any) =>{
          this.dialogRef.close(1);
        }, (error:any) => {
          this.dialogRef.close(2);
        })
    }else {
      //create
      this.categoryService.saveCategorie(data)
        .subscribe((data:any) => {
          console.log(data);
          this.dialogRef.close(1);
        }, (error:any) => {
          this.dialogRef.close(2);
        })

    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any){
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      creador: [data.creador, Validators.required],
      fecha_actualizacion: [data.fecha_actualizacion, Validators.required],
      version: [data.version]
    });
  }

}
