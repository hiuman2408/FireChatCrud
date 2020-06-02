import { ProductosComponent } from './../productos-firestore/productos/productos.component';




import {  Routes } from '@angular/router';


export const PRODUCTOSROUTES: Routes = [

   { path: 'listar', component:ProductosComponent },

    
    { path: '**', pathMatch: 'full', redirectTo: 'listar' }
 ];