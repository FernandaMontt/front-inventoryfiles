import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { DetailExecuteComponent } from 'src/app/modules/shared/components/detailsexecute/detailsexecute.component';

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.component.html',
  styleUrls: ['./combinacion.component.css']
})
export class CombinacionComponent implements OnInit{

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, private snackBar: MatSnackBar){ }

  ngOnInit(): void {
    this.getComparacion();
  }

  displayedColumns: string[] = ['id_comparacion','archivoNombreAarchivoNombreB','version','id_ArchivoA','fecha_inicio',
    'creador','estadoArchivoB','porcentajeIgualAB','porcentajeAnotB','porcentajeBnotA', 'actions'];
  dataSource = new MatTableDataSource<CombinancionElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getComparacion(){

    this.categoryService.getComparacion()
    .subscribe( (data:any) =>{

      console.log("respuesta archivos: ", data);
      this.processCategoriesResponse(data);

    }, (error:any) => {
      console.log("error: ", error);
    })
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CombinancionElement[] = [];
      let listCategory = resp.body;
      listCategory.forEach((element: CombinancionElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CombinancionElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width:'500px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Combinación Agregada","Exito");
        this.getComparacion();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al guardar la comparación", "Error");
      }
    });
  }

  edit(id:number, name: string, descripcion: string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width:'500px',
      data:{id: id, name: name, descripcion: descripcion}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Combinación Actualizada","Exito");
        this.getComparacion();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al actualizar la comparación", "Error");
      }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data:{id: id}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Combinación eliminada","Exito");
        this.getComparacion();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al eliminar la comparación", "Error");
      }
    });
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.getComparacion();
    }else{
      this.categoryService.getCategorieById(termino)
          .subscribe((resp:any)=>{
            this.processCategoriesResponse(resp);
          })
    }
  }

  openSnackBar(message: string, action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  detail(id:number){
    const dialogRef = this.dialog.open(DetailExecuteComponent, {
      data:{id: id}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==1){
        this.getComparacion();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al ver la combinación", "Error");
      }
      
    });

  }



}

export interface CombinancionElement{
    id_comparacion: number;
    archivoNombreAarchivoNombreB: string;
    descripcionArchivo: string;
    id_ArchivoA: number;
    fecha_inicio: Date;
    creador: string;
    estadoArchivoB: boolean;
    version: string;
    porcentajeIgualAB: number;
    porcentajeAnotB: number;
    porcentajeBnotA: number;
}
