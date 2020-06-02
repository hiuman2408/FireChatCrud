import { PRODUCTOSROUTES } from './components/productos-firestore/productos.route';
import { CrudFirestoreComponent } from './components/crud-firestore/crud-firestore.component';
import { CHATROUTES } from './components/chatFirebase/chat.route';
import { ChatfirebaseComponent } from './components/chatFirebase/chatfirebase.component';

import { CrudFirebaseComponent } from './components/crud-firebase/crud-firebase.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HEROEROUTES } from './components/crud-firebase/heroe.route';
import { EMPLEADOSROUTES } from './components/crud-firestore/empleado.route';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'formulario', component: FormulariosComponent },
  { path: 'crudFirebase', 
  component: CrudFirebaseComponent,
  children:HEROEROUTES},
  { path: 'chatFirebase', 
  component: ChatfirebaseComponent,
  children:CHATROUTES
 },
 { path: 'crudFirestore',
  component: CrudFirestoreComponent,
children:EMPLEADOSROUTES },
{ path: 'productoFirestore',
component: CrudFirestoreComponent,
children:PRODUCTOSROUTES },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
//PRODUCTOSROUTES

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
