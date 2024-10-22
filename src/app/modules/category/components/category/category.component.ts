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
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalCompartirDefinicionDialog } from '../modalcompartirdefinicion/modalcompartirdefinicion.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  filterForm: FormGroup;
  constructor(private categoryService: CategoryService,private fb: FormBuilder,private router: Router,
              public dialog: MatDialog, private snackBar: MatSnackBar){
                this.filterForm = this.fb.group({
                id_Archivo: [''],
                nombreArchivo: [''],
                descripcionArchivo: [''],
                creador: [null],
                owner: [''],
                fechamodificado: [null], 
                modificadopor: [''],
                version: [''],
                estado: ['']
              }); }
  displayedColumns: string[] = ['id_Archivo','nombreArchivo','descripcionArchivo','fecha_creacion','owner','fecha_actualizacion','creador'
    ,'version','estado','actions'];
  users: User[] = [
      { id: 1, name: 'Fernanda M...', canRead: true, canExecute: true, canWrite: false },
      { id: 2, name: 'Felipe B...', canRead: true, canExecute: true, canWrite: true },
      { id: 3, name: 'Nicolas O...', canRead: true, canExecute: true, canWrite: true },
      { id: 4, name: 'Francisco G...', canRead: true, canExecute: false, canWrite: false },
    ];
  dataSource = new MatTableDataSource<CategoryElement>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
        const filterValues = JSON.parse(filter);
        
        const matchId = !filterValues.id_Archivo || data.id_Archivo.toString().toLowerCase().includes(filterValues.id_Archivo.toLowerCase());
        const matchNombre = !filterValues.nombreArchivo || data.nombreArchivo.toLowerCase().includes(filterValues.nombreArchivo.toLowerCase());
        const matchDescripcion = !filterValues.descripcionArchivo || data.descripcionArchivo.toLowerCase().includes(filterValues.descripcionArchivo.toLowerCase());
        const matchCreador = !filterValues.creador || data.creador.toLowerCase().includes(filterValues.creador.toLowerCase());
        const matchOwner = !filterValues.owner || data.owner.toLowerCase().includes(filterValues.owner.toLowerCase());
        const matchFechaModificado = !filterValues.fechamodificado || new Date(data.fecha_actualizacion).toISOString().split('T')[0] === filterValues.fechamodificado;
        const matchModificadoPor = !filterValues.modificadopor || data.modificadopor.toLowerCase().includes(filterValues.modificadopor.toLowerCase());
        const matchVersion = !filterValues.version || data.version.toLowerCase().includes(filterValues.version.toLowerCase());
        const matchEstado = !filterValues.estado || data.estado.toLowerCase().includes(filterValues.estado.toLowerCase());
    
        return matchId && matchNombre && matchDescripcion && matchCreador && matchOwner && matchFechaModificado && matchModificadoPor && matchVersion && matchEstado;
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

  applyFilters() {
    const filterValues = this.filterForm.value;

    // Filtra los datos en la tabla basados en los valores del formulario
    this.dataSource.filter = JSON.stringify({
        id_Archivo: filterValues.id_Archivo,
        nombreArchivo: filterValues.nombreArchivo,
        descripcionArchivo: filterValues.descripcionArchivo,
        creador: filterValues.creador,
        owner: filterValues.owner,
        fechamodificado: filterValues.fechamodificado,
        modificadopor: filterValues.modificadopor,
        version: filterValues.version,
        estado: filterValues.estado
    });
}

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
      this.dataSource.sort = this.sort;
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
    this.router.navigate(['/filescreate', id, name, descripcion, creador, fecha_actualizacion, version, 'edit']);
  }

  detail(id:number){
    this.router.navigate(['/filescreate', id, 'details']);

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

  share(id: any) {
    // Abrir el modal
    const dialogRef = this.dialog.open(ModalCompartirDefinicionDialog, {
      width: '80%', // Ancho del modal
      data: {
        users: this.users,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar la lógica después de que se cierra el modal
      console.log('El modal se cerró');
    });
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

export interface User {
  id: number;
  name: string;
  canRead: boolean;
  canExecute: boolean;
  canWrite: boolean;
}
