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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnDefinitionsDialog } from '../columnsdefinition/columnsdefinition.component';
import { ColumnDefinitionsDialogB } from '../columnsdefinitionB/columnsdefinitionB.component';
import { ColumnDefinitionsDialogOutput } from '../columnsdefinitionoutput/columnsdefinitionoutput.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-executioncreate',
  templateUrl: './executioncreate.component.html',
  styleUrls: ['./executioncreate.component.css']
})
export class ExecutionCreateComponent implements OnInit{
  myGroupDefinition: FormGroup;
  myGroupSelected: FormGroup;
  mysAGroup: FormGroup;
  mysBGroup: FormGroup;
  id?: number;
  mode?: string;
  title: string = 'Crear una Ejecución'; 
  constructor(private categoryService: CategoryService,private fb: FormBuilder,private route: ActivatedRoute,private router: Router,
              public dialog: MatDialog, private snackBar: MatSnackBar){ 
                this.myGroupDefinition = new FormGroup({
                  twinsname: new FormControl(''),
                  id: new FormControl('')
                });
                this.myGroupSelected = this.fb.group({
                  twinsname: new FormControl(''),
                  createdat: new FormControl(''),
                  version: new FormControl(''), 
                  description: new FormControl(''), 
                  createdby: new FormControl(''), 
                  state: new FormControl(''),
                  id: new FormControl(''),
                  updateat: new FormControl
                });
                this.mysAGroup = this.fb.group({
                  definitionType: ['file'],  // Valor por defecto es 'file'
                  totalrowcount: [''],
                  rowsok: [''],
                  verificationstate: ['']
                });
                this.mysBGroup = this.fb.group({
                  definitionType: ['file'],  // Valor por defecto es 'file'
                  totalrowcount: [''],
                  rowsok: [''],
                  verificationstate: ['']
                });
              }
  ngOnInit(): void {

    this.myGroupDefinition = this.fb.group({
      twinsname: ['', Validators.required],
      id: ['', Validators.required],
    });

    this.myGroupSelected = this.fb.group({
      twinsname: ['', Validators.required],
      createdat: ['', Validators.required],
      version: ['', Validators.required],
      description: ['', Validators.required],
      createdby: ['', Validators.required],
      state: ['', Validators.required],
      id: ['', Validators.required],
      updateat: ['', Validators.required],
    });

    this.mysAGroup = this.fb.group({
      totalrowcount: ['', Validators.required],
      rowsok: ['', Validators.required],
      verificationstate: ['', Validators.required],
    });

    this.mysBGroup = this.fb.group({
      totalrowcount: ['', Validators.required],
      rowsok: ['', Validators.required],
      verificationstate: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierto el parámetro id a número
      this.mode = params['mode'];
      
      if (this.mode === 'details') {
        this.title = 'Detalles de una Ejecución';
        // Aquí puedes cargar los detalles usando this.id
      }
    });

  }

  get definitionTypeValue(): string | null {
    const control = this.myGroupSelected.get('definitionType');
    return control ? control.value : null;
  }

  editElement(element: any) {
    // Lógica para editar el elemento
    console.log('Editar elemento:', element);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file);
      // Aquí puedes manejar la lógica adicional para el archivo seleccionado, 
      // como subirlo a un servidor o mostrar su nombre en la interfaz
    }
  }

  onFileSelectedB(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file);
      // Aquí puedes manejar la lógica adicional para el archivo seleccionado, 
      // como subirlo a un servidor o mostrar su nombre en la interfaz
    }
  }
  // Método para verificar la definición
  onVerifyDefinition() {
    console.log('Verify definition clicked');
    // Aquí puedes agregar la lógica para verificar la definición
  }

  // Método para generar un archivo de prueba
  onGenerateTestFile() {
    console.log('Generate test file clicked');
    // Aquí puedes agregar la lógica para generar un archivo de prueba
  }

  onEditColumnsB(): void {
    const dialogRef = this.dialog.open(ColumnDefinitionsDialogB, {
      panelClass: 'custom-dialog-container',
      width: '80%',  // Puedes ajustar el tamaño del modal
      data: {

      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Maneja lo que suceda después de cerrar el modal
    });
  }

  onEditColumnsA(): void {
    const dialogRef = this.dialog.open(ColumnDefinitionsDialogOutput, {
      panelClass: 'custom-dialog-container',
      width: '80%',  // Puedes ajustar el tamaño del modal
      data: {
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Maneja lo que suceda después de cerrar el modal
    });
  }

  // Método para verificar la definición
  onVerifyDefinitionB() {
    console.log('Verify definition clicked');
    // Aquí puedes agregar la lógica para verificar la definición
  }

  // Método para generar un archivo de prueba
  onGenerateTestFileB() {
    console.log('Generate test file clicked');
    // Aquí puedes agregar la lógica para generar un archivo de prueba
  }

  onClose() {
    if (this.mode === 'details') {
      this.router.navigate(['/dashboard/comparacion']);
    }
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
