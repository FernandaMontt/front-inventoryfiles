import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarruselComponent } from './carrusel/carrusel.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryModule,
    MatSidenavModule
  ]
})
export class DashboardModule { }
