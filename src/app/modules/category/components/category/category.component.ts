import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { DetailFilesComponent } from 'src/app/modules/shared/components/detailsfiles/detailsfiles.component';
import { ExecutefileComponent } from 'src/app/modules/shared/components/executefile/executefile.component';
import { TestfilesComponent } from 'src/app/modules/shared/components/testfiles/testfiles.component';
import { NewfilesComponent } from '../newfiles/newfiles.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, private snackBar: MatSnackBar){ }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['id_Archivo','nombreArchivo','descripcionArchivo','fecha_creacion','owner','fecha_actualizacion','creador'
    ,'version','estado','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getCategories(){

    this.categoryService.getCategories()
    .subscribe( (data:any) =>{

      console.log("respuesta archivos: ", data);
      this.processCategoriesResponse(data);

    }, (error:any) => {
      console.log("error: ", error);
    })
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];
      let listCategory = resp.body;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewfilesComponent, {
      width:'500px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Archivo Agregado","Exito");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al guardar el archivo", "Error");
      }
    });
  }

  edit(id:number, name: string, descripcion: string, creador: string, fecha_actualizacion: Date, version: number ){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width:'700px',
      data:{id: id, name: name, descripcion: descripcion, creador, fecha_actualizacion, version}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Archivo Actualizado","Exito");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al actualizar el archivo", "Error");
      }
    });
  }

  detail(id:number){
    const dialogRef = this.dialog.open(DetailFilesComponent, {
      data:{id: id}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==1){
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al ver el archivo", "Error");
      }
      
    });

  }

  doSomething($event: any) {
    $event.stopPropagation();
  }

  filtrarId(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.id_Archivo.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarNombre(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const nombreArchivo = data.nombreArchivo.toString().toLowerCase();
      return nombreArchivo.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarDescripcion(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const descripcionArchivo = data.descripcionArchivo.toString().toLowerCase();
      return descripcionArchivo.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarFechaCreacion(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filterPredicate = (data, filter) => {
      const fechaCreacion = new Date(data.fecha_creacion);
      const filtroFecha = new Date(filter);
      return !isNaN(fechaCreacion.getTime()) && fechaCreacion >= filtroFecha;
    };
    this.dataSource.filter = filtro;
  }

  filtrarOwner(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const owner = data.owner.toString().toLowerCase();
      return owner.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarFechaModificado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim();
    // Configurar el filtro personalizado para las fechas
    this.dataSource.filterPredicate = (data, filter) => {
      // Convertir la fecha actual de la fila a un objeto Date
      const fechaActualizacion = new Date(data.fecha_actualizacion);
      // Convertir el valor del filtro a un objeto Date
      const filtroFecha = new Date(filter);
      // Verificar si ambas fechas son válidas
      if (!isNaN(fechaActualizacion.getTime()) && !isNaN(filtroFecha.getTime())) {
        // Comparar las fechas (puedes ajustar según tus necesidades)
        return fechaActualizacion.toDateString() === filtroFecha.toDateString();
      }
      // Si las fechas no son válidas, no coinciden
      return false;
    };
    // Asignar el filtro (puede ser la cadena de fecha completa)
    this.dataSource.filter = filtro;
  }

  filtrarModificadoPor(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const modificadopor = data.creador.toString().toLowerCase();
      return modificadopor.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarVersion(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const version = data.version.toString().toLowerCase();
      return version.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarEstado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const estado = data.estado.toString().toLowerCase();
      return estado.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data:{id: id}
      
    });


    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Categoría eliminada","Exito");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al eliminar categoría", "Error");
      }
    });
  }

  execute(id:any){
    const dialogRef = this.dialog.open(ExecutefileComponent, {
      data:{id: id}
      
    });


    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Archivo ejecutado","Exito");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al ejecutar el archivo", "Error");
      }
    });
  }

  test(id:any){
    const dialogRef = this.dialog.open(TestfilesComponent, {
      data:{id: id}
      
    });


    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result==1){
        this.openSnackBar("Archivo testeado","Exito");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al testear el archivo", "Error");
      }
    });
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.getCategories();
    }else{
      this.categoryService.getFilesById(termino)
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



}

export interface CategoryElement{
  nombreArchivo: string;
  descripcionArchivo: string;
  id_Archivo: number;
  fecha_creacion: Date;
  creador: string;
  fecha_actualizacion: Date;
  version: string;
  estado: string;
  owner: string;
}
