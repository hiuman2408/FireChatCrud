import { ChatServiceService } from './../../../services/chat-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
//impotaciones

import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginform: FormGroup;
 
  

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router:Router,
              private chatservice:ChatServiceService) {   
              this.loginform = this.crearFromGroup();
                 
  }

  ngOnInit() {

   this.chatservice.getAuth().subscribe(user2=>{

    if(user2){
    
      this.router.navigate(['/chatFirebase/chats'])
     
    } 
   })

  }


  //iniciar seccion con diferentes formas 
  onLoginFirebase(proveedor:string){
    console.log(proveedor)


    if(proveedor==="usuario"){

      if(this.loginform.valid){

        this.router.navigate(['/chatFirebase/chats'])

        this.chatservice.loginWithEmailAndPassword(this.loginform.value.email,this.loginform.value.password);
          //console.log(this.loginform.value.email)

  
        }else{
         console.log("error al autenticarse")
            return;
        }  

    }else{

      this.chatservice.login(proveedor);

     setTimeout(() => {
      this.router.navigate(['/chatFirebase/chats'])
       
     }, 3000);
    
    }
  }

  //crear form group para formulario reactivo 

  crearFromGroup(){
    return new FormGroup({
      email:new FormControl('juan2408@gmail.com',[Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
     
    })
  }

  //para poder hacer referencia en nuestro formulario HTML, binding 
  get email() { return this.loginform.get('email'); }
  get password() { return this.loginform.get('password'); }

}
