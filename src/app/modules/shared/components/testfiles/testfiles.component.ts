import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-testfiles',
  templateUrl: './testfiles.component.html',
  styleUrls: ['./testfiles.component.css']
})
export class TestfilesComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<TestfilesComponent>,
            @Inject (MAT_DIALOG_DATA) public data:any,
            private categoryService: CategoryService){

  }

  ngOnInit(): void {
      
  }

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data != null){
      this.categoryService.deleteCategorie(this.data.id)
            .subscribe((data:any) => {
              this.dialogRef.close(1);
            }, (error:any) => {
              this.dialogRef.close(2);
            })
    }else{
      this.dialogRef.close(2);
    }
  }
}
