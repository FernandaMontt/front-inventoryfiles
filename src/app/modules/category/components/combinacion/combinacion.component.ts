import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { DetailExecuteComponent } from 'src/app/modules/shared/components/detailsexecute/detailsexecute.component';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.component.html',
  styleUrls: ['./combinacion.component.css']
})
export class CombinacionComponent implements OnInit{
  filterCombinantion : FormGroup;
  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder,private router: Router){ 
                this.filterCombinantion = this.fb.group({
                  id_comparacion: [''],
                  archivoNombreAarchivoNombreB: [''],
                  id_ArchivoA: [''],
                  version: [''],
                  creador: [''],
                  fecha_inicio: [null], 
                  estadoArchivoB: [''],
                  porcentajeIgualAB: [''],
                  porcentajeAnotB: [''],
                  porcentajeBnotA: ['']
                });
              }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id_comparacion','archivoNombreAarchivoNombreB','id_ArchivoA','version','creador','fecha_inicio'
    ,'estadoArchivoB','porcentajeIgualAB','porcentajeAnotB','porcentajeBnotA', 'actions'];
  dataSource = new MatTableDataSource<CombinancionElement>();
  ngOnInit(): void {
    this.getComparacion();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

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
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  announceSortChange(event: Sort) {
    console.log(event);
  }
  

  doSomething($event: any) {
    $event.stopPropagation();
  }

  

  filtrarId(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.id_comparacion.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarIdArchivo(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.id_ArchivoA.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarNombreEjecution(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.archivoNombreAarchivoNombreB.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarVersion(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.version.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarCreado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.creador.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarFechaInicio(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filterPredicate = (data, filter) => {
      const fechaInicio = new Date(data.fecha_inicio);
      const filtroFecha = new Date(filter);
      return !isNaN(fechaInicio.getTime()) && fechaInicio >= filtroFecha;
    };
    this.dataSource.filter = filtro;
  }

  filtrarEstado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.estadoArchivoB.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarporcentajeIgualAB(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.porcentajeIgualAB.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarporcentajeAnotB(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.porcentajeAnotB.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
  }

  filtrarporcentajeBnotA(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const id = data.porcentajeBnotA.toString().toLowerCase();
      return id.includes(filter);
    };
    this.dataSource.filter = filtro;
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
    this.router.navigate(['/executioncreate', id, 'details']);
  }

  applyFilters(){

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
