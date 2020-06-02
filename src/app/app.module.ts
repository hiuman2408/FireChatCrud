import { EmpleadoService } from './services/empleado.service';
import { HeroeServiceService } from './services/heroe-service.service';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//ANGULAR FIRE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//RUTAS 
import { AppRoutingModule } from './app-routing.module';

//servicios
import { ChatServiceService } from './services/chat-service.service';
//MODULOS 

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { CrudFirebaseComponent } from './components/crud-firebase/crud-firebase.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { LoginComponent } from './components/chatFirebase/login/login.component';
import { ChatComponent } from './components/chatFirebase/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { ChatfirebaseComponent } from './components/chatFirebase/chatfirebase.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { HeroesComponent } from './components/crud-firebase/heroes/heroes.component';
import { HeroeComponent } from './components/crud-firebase/heroe/heroe.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudFirestoreComponent } from './components/crud-firestore/crud-firestore.component';
import { EmpleadosComponent } from './components/crud-firestore/empleados/empleados.component';

import { ActualizarEmpleadoComponent } from './components/crud-firestore/actualizar-empleado/actualizar-empleado.component';
import { ProductosFirestoreComponent } from './components/productos-firestore/productos-firestore.component';
import { ProductosComponent } from './components/productos-firestore/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CrudFirebaseComponent,
    FormulariosComponent,
    LoginComponent,
    ChatComponent,
    HomeComponent,
    ChatfirebaseComponent,
    FechaPipe,
    HeroesComponent,
    HeroeComponent,
    CrudFirestoreComponent,
    EmpleadosComponent,
    ActualizarEmpleadoComponent,
    ProductosFirestoreComponent,
    ProductosComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firechat),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule 

  ],

  providers: [

  ChatServiceService,
  HeroeServiceService,
  EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
