import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CombinacionComponent } from './components/combinacion/combinacion.component';
import { NewComparacionComponent } from './components/new-comparacion/new-comparacion.component';
import { NewfilesComponent } from './components/newfiles/newfiles.component';
import { FilesCreateComponent } from './components/filescreate/filescreate.component';
import { ColumnDefinitionsDialog } from './components/columnsdefinition/columnsdefinition.component';
import { ColumnDefinitionsDialogB } from './components/columnsdefinitionB/columnsdefinitionB.component';
import { ColumnDefinitionsDialogOutput } from './components/columnsdefinitionoutput/columnsdefinitionoutput.component';
import { ExecutionCreateComponent } from './components/executioncreate/executioncreate.component';
import { CrossoverDefinitionModalComponent } from './components/crossoverdefinition/crossoverdefinition.component';
import { RouterChildModule } from '../dashboard/router-child.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalCompartirDefinicionDialog } from './components/modalcompartirdefinicion/modalcompartirdefinicion.component';



@NgModule({
  declarations: [
    CategoryComponent,
    NewCategoryComponent,
    CombinacionComponent,
    NewComparacionComponent,
    NewfilesComponent,
    FilesCreateComponent,
    ColumnDefinitionsDialog,
    ColumnDefinitionsDialogB,
    ColumnDefinitionsDialogOutput,
    ExecutionCreateComponent,
    CrossoverDefinitionModalComponent,
    ModalCompartirDefinicionDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    RouterChildModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryModule { }
