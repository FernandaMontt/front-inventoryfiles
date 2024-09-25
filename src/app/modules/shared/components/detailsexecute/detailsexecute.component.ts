import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { CategoryElement } from 'src/app/modules/category/components/category/category.component';

@Component({
  selector: 'app-detailsexecute',
  templateUrl: './detailsexecute.component.html',
  styleUrls: ['./detailsexecute.component.css']
})
export class DetailExecuteComponent implements OnInit{
  public comparacion: any;
  constructor(public dialogRef: MatDialogRef<DetailExecuteComponent>,
            @Inject (MAT_DIALOG_DATA) public data:any,
            private categoryService: CategoryService){
              console.log(data);
  }

  

  ngOnInit(): void {
    if(this.data != null){
      this.categoryService.getExecuteById(this.data.id)
            .subscribe((data:any) => {
              console.log("respuesta archivo: ", data);
              this.comparacion = data.body[0];
              console.log(this.comparacion);
            }, (error:any) => {
              console.error(error);
            })
    }else{
      this.dialogRef.close(2);
    }
  }

  onNoClick(){
    this.dialogRef.close(3);
  }
}
