import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { CategoryElement } from 'src/app/modules/category/components/category/category.component';

@Component({
  selector: 'app-detailsfiles',
  templateUrl: './detailsfiles.component.html',
  styleUrls: ['./detailsfiles.component.css']
})
export class DetailFilesComponent implements OnInit{
  public archivo: any;
  constructor(public dialogRef: MatDialogRef<DetailFilesComponent>,
            @Inject (MAT_DIALOG_DATA) public data:any,
            private categoryService: CategoryService){
              console.log(data);
  }

  

  ngOnInit(): void {
    if(this.data != null){
      this.categoryService.getFilesById(this.data.id)
            .subscribe((data:any) => {
              console.log("respuesta archivo: ", data);
              this.archivo = data.body[0];
              console.log(this.archivo);
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
