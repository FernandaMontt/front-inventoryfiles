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
import { CrossoverDefinitionModalComponent } from '../crossoverdefinition/crossoverdefinition.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filescreate',
  templateUrl: './filescreate.component.html',
  styleUrls: ['./filescreate.component.css']
})
export class FilesCreateComponent implements OnInit{
  title: string = 'Crear Definición'; 
  id?: number;
  mode?: string;
  myGroup: FormGroup;
  mysGroup: FormGroup;
  mysBGroup: FormGroup;
  mysOutputGroup: FormGroup;
  showActions = false;
  showBActions = false;
  showOutActions = false;
  fileTypes: string[] = ['CSV', 'TXT'];
  encodings: string[] = ['UTF-8', 'ISO-8859-1', 'ASCII', 'UTF-16'];
  fileTypesB: string[] = ['CSV', 'TXT'];
  fileTypesOutput: string[] = ['CSV', 'TXT'];
  encodingsB: string[] = ['UTF-8', 'ISO-8859-1', 'ASCII', 'UTF-16'];
  encodingsOutput: string[] = ['UTF-8', 'ISO-8859-1', 'ASCII', 'UTF-16'];
  displayedColumns: string[] = ['description', 'element1', 'operator', 'element2', 'tolerance', 'actions'];
  displayedColumnsColumnas = this.showActions
  ? ['columnName', 'columnType', 'columnUnique', 'actions']
  : ['columnName', 'columnType', 'columnUnique'];
  displayedColumnsColumnasB = this.showBActions
  ? ['columnName', 'columnType', 'columnUnique', 'actions']
  : ['columnName', 'columnType', 'columnUnique'];
  displayedColumnsOutput = this.showOutActions
  ? ['columnName', 'columnType', 'columnUnique', 'actions']
  : ['columnName', 'columnType', 'columnUnique'];
  dataSource = [
    { description: 'Ejemplo 1', element1: 'A', operator: '+', element2: 'B', tolerance: '5%' },
    { description: 'Ejemplo 2', element1: 'C', operator: '-', element2: 'D', tolerance: '10%' },
  ];
  dataSourceColumnas = new MatTableDataSource([
    { columnName: 'Column 1', columnType: 'String', columnUnique: 'True' },
    { columnName: 'Column 2', columnType: 'Integer', columnUnique: 'False' }
  ]);
  dataSourceColumnasB = new MatTableDataSource([
    { columnName: 'Column 3', columnType: 'boolean', columnUnique: 'False' },
    { columnName: 'Column 4', columnType: 'number', columnUnique: 'False' }
  ]);
  dataSourceColumnasOutput = new MatTableDataSource([
    { columnName: 'Column 5', columnType: 'bit', columnUnique: 'False' },
    { columnName: 'Column 6', columnType: 'varchar', columnUnique: 'True' }
  ]);
  constructor(private categoryService: CategoryService,private fb: FormBuilder,private route: ActivatedRoute,
    private router: Router,
              public dialog: MatDialog, private snackBar: MatSnackBar){ 
                this.myGroup = new FormGroup({
                  twinsname: new FormControl(''),
                  createdat: new FormControl(''),
                  version: new FormControl(''), 
                  description: new FormControl(''), 
                  createdby: new FormControl(''), 
                  state: new FormControl(''),
                  id: new FormControl('')
                });
                this.mysGroup = this.fb.group({
                  definitionType: ['file'],  // Valor por defecto es 'file'
                  filename: [''],
                  description: [''],
                  columnFormat: ['fixedLength'], // Valor inicial de la selección
                  separator: [''],
                  fileType: [''],
                  rowType: [false],
                  fileEncoding: [''],
                  rowEnding: ['']
                });
                this.mysBGroup = this.fb.group({
                  definitionType: ['file'],  // Valor por defecto es 'file'
                  filename: [''],
                  description: [''],
                  columnFormat: ['fixedLength'], // Valor inicial de la selección
                  separator: [''],
                  fileType: [''],
                  rowType: [false],
                  fileEncoding: [''],
                  rowEnding: ['']
                });
                this.mysOutputGroup = this.fb.group({
                  archivoOpcion: ['', Validators.required],
                  A_B: [false], // Control para el checkbox "A = B"
                  AnotB: [false], // Control para el checkbox "A not B"
                  BnotA: [false],
                  fileType: [''],
                  fileEncoding: [''],
                  conservarFormatoAyB: [false],
                  conservarFormatoA: [false],
                  conservarFormatoB: [false]
                });
              }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierto el parámetro id a número
      this.mode = params['mode'];
      
      if (this.mode === 'details') {
        this.title = 'Detalles de la Definición';
        // Aquí puedes cargar los detalles usando this.id
      }
      if (this.mode === 'edit') {
        this.title = 'Modificar la Definición';
        // Aquí puedes cargar los detalles usando this.id
      }
    });

  }

  get definitionTypeValue(): string | null {
    const control = this.mysGroup.get('definitionType');
    return control ? control.value : null;
  }

  editElement(element: any) {
    // Lógica para editar el elemento
    console.log('Editar elemento:', element);
  }

  deleteElement(element: any) {
    // Lógica para eliminar el elemento
    console.log('Eliminar elemento:', element);
    this.dataSource = this.dataSource.filter(item => item !== element);
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

  onEditColumns(): void {
    const dialogRef = this.dialog.open(ColumnDefinitionsDialog, {
      panelClass: 'custom-dialog-container',
      width: '80%',  // Puedes ajustar el tamaño del modal
      data: {
        dataSource: this.dataSourceColumnas,
        displayedColumns: this.displayedColumnsColumnas,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Maneja lo que suceda después de cerrar el modal
    });
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
        dataSource: this.dataSourceColumnasB,
        displayedColumns: this.displayedColumnsColumnasB,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Maneja lo que suceda después de cerrar el modal
    });
  }

  onEditColumnsOutput(): void {
    const selectedOptions = {
      A_B: this.mysOutputGroup.value.A_B,
      AnotB: this.mysOutputGroup.value.AnotB,
      BnotA: this.mysOutputGroup.value.BnotA,
    };
  
    const dataSourceArray = [];
  
    if (selectedOptions.A_B) {
      dataSourceArray.push({
        dataSource: this.getDataSourceForAB(), // Reemplaza con tu lógica para obtener el dataSource
        displayedColumns: ['columnName', 'columnType', 'columnUnique'],
      });
    }
    if (selectedOptions.AnotB) {
      dataSourceArray.push({
        dataSource: this.getDataSourceForAnotB(), // Reemplaza con tu lógica para obtener el dataSource
        displayedColumns: ['columnName', 'columnType', 'columnUnique'],
      });
    }
    if (selectedOptions.BnotA) {
      dataSourceArray.push({
        dataSource: this.getDataSourceForBnotA(), // Reemplaza con tu lógica para obtener el dataSource
        displayedColumns: ['columnName', 'columnType', 'columnUnique'],
      });
    }
  
    // Verificar si no se seleccionó ninguna opción
  if (dataSourceArray.length === 0) {
    this.dialog.open(ColumnDefinitionsDialogOutput, {
      panelClass: 'custom-dialog-container',
      width: '80%',
      data: {
        message: 'Seleccione una de las opciones: A = B, A not B o B not A.',
      }
    });
    return; // Salir del método si no hay opciones seleccionadas
  }

  const dialogRef = this.dialog.open(ColumnDefinitionsDialogOutput, {
    panelClass: 'custom-dialog-container',
    width: '80%',
    data: {
      dataSourceArray: dataSourceArray,
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    // Maneja lo que suceda después de cerrar el modal
  });
  }

  // Ejemplo de función para obtener el dataSource para A = B
  getDataSourceForAB() {
    return [
      { columnName: 'Nombre A', columnType: 'Tipo A', columnUnique: true },
      // Añade más datos según tu lógica
    ];
  }

  // Ejemplo de función para obtener el dataSource para A not B
  getDataSourceForAnotB() {
    return [
      { columnName: 'Nombre A not B', columnType: 'Tipo A not B', columnUnique: false },
      // Añade más datos según tu lógica
    ];
  }

  // Ejemplo de función para obtener el dataSource para B not A
  getDataSourceForBnotA() {
    return [
      { columnName: 'Nombre B not A', columnType: 'Tipo B not A', columnUnique: true },
      // Añade más datos según tu lógica
    ];
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

  openCrossoverModal(): void {
    const dialogRef = this.dialog.open(CrossoverDefinitionModalComponent, {
      width: '50%',
      data: {}  // Puedes pasar datos adicionales si lo necesitas
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        // Procesa los datos obtenidos del modal
      }
    });
  }

  onClose() {
    if (this.mode === 'details' || this.mode === 'edit') {
      this.router.navigate(['/dashboard/category']); // Cambia 'category' al nombre de tu ruta
    }
    else{
      const dialogRef = this.dialog.open(NewCategoryComponent, {
        panelClass: 'custom-dialog-container',
        width: '80%'
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Maneja lo que suceda después de cerrar el modal
      });
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
