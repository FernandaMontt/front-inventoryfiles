import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenaComponent } from './components/sidena/sidena.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DetailFilesComponent } from './components/detailsfiles/detailsfiles.component';
import { ExecutefileComponent } from './components/executefile/executefile.component';
import { TestfilesComponent } from './components/testfiles/testfiles.component';
import { DetailExecuteComponent } from './components/detailsexecute/detailsexecute.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    SidenaComponent,
    ConfirmComponent,
    DetailFilesComponent,
    ExecutefileComponent,
    TestfilesComponent,
    DetailExecuteComponent,
    FooterComponent
  ],
  exports: [
    SidenaComponent,
    FooterComponent
  ]
  ,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ]
})
export class SharedModule { }
