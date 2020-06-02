import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import {  Routes } from '@angular/router';






export const CHATROUTES: Routes = [

   { path: 'login', component: LoginComponent },
   { path: 'chats', component: ChatComponent },
    
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
 ];