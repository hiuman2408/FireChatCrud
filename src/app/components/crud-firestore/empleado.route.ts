
import { ActualizarEmpleadoComponent } from './actualizar-empleado/actualizar-empleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';

import {  Routes } from '@angular/router';

export const EMPLEADOSROUTES: Routes = [

   { path: 'listar', component: EmpleadosComponent },
 
   { path: 'actualizar/:id', component: ActualizarEmpleadoComponent },
    
    { path: '**', pathMatch: 'full', redirectTo: 'listar' }
 ];