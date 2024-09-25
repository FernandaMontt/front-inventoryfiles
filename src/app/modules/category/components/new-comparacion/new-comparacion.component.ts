import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-comparacion',
  templateUrl: './new-comparacion.component.html',
  styleUrls: ['./new-comparacion.component.css']
})
export class NewComparacionComponent implements OnInit{

  public comparacionForm: FormGroup;
  estadoFormulario: string = "";
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
              private dialogRef: MatDialogRef<NewComparacionComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any){

    console.log(data);
    this.estadoFormulario = "Agregar";

    this.comparacionForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required]
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
      name: this.comparacionForm.get('name')?.value,
      descripcion: this.comparacionForm.get('descripcion')?.value
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
    this.comparacionForm = this.fb.group({
      name: [data.name, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });
  }

}
