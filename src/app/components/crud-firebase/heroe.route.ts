import { HeroeComponent } from './heroe/heroe.component';


import {  Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';






export const HEROEROUTES: Routes = [

   { path: 'listar', component: HeroesComponent },
   { path: 'heroe/:id', component: HeroeComponent },
    
    { path: '**', pathMatch: 'full', redirectTo: 'listar' }
 ];