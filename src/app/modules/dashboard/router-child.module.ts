import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from '../category/components/category/category.component';
import { CombinacionComponent } from '../category/components/combinacion/combinacion.component';
import { FilesCreateComponent } from '../category/components/filescreate/filescreate.component';
import { ExecutionCreateComponent } from '../category/components/executioncreate/executioncreate.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'comparacion', component: CombinacionComponent },
    { path: 'filescreate', component: FilesCreateComponent},
    { path: 'executioncreate', component: ExecutionCreateComponent},
    { path: 'filescreate/:id/:mode', component: FilesCreateComponent },
    { path: 'executioncreate/:id/:mode', component: ExecutionCreateComponent},
    { path: 'filescreate/:id/:name/:descripcion/:creador/:fecha_actualizacion/:version/:mode', component: FilesCreateComponent }
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
