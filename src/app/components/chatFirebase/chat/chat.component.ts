import { Usuario } from 'src/app/interface/usuario';
import { Router } from '@angular/router';
import { ChatServiceService } from './../../../services/chat-service.service';
import { Component, OnInit } from '@angular/core';
//impotaciones
import { AngularFireAuth } from 'angularfire2/auth';
import { Mensaje } from 'src/app/interface/mensaje';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user:any;
  proveedor:string;
  fecha:number;
  mensaje: string;

  constructor(private _sc:ChatServiceService,private router:Router) {
    this.user=[];
    this._sc.cargarMensaje().subscribe(); 
  }

  ngOnInit() {

    this.getmensajenombre();
   /* this._sc.getUser().subscribe(data=>{
      console.log("getUser"+data.email)
    });*/

    this.proveedor = localStorage.getItem('proveedor'); 
    
   //GET PARA VER QUE USUARIO ESAT AUTENTICADO
    this._sc.getAuth().subscribe(user2=>{
     
     // console.log(user2)

      if(user2){
        if(user2.displayName){
          this.user = {
            nombre:user2.displayName,
            email:user2.email,
            photo:user2.photoURL,
            uid:user2.uid    
          }  
        }else{
          this.user = {
            nombre:"invitado",
            email:user2.email,
            photo:"https://image.freepik.com/vector-gratis/perfil-empresario-dibujos-animados_18591-58479.jpg",
            uid:user2.uid    
          };

        }

       // console.log("usuario logeado:")
        //console.log(this.user)
        
        
       
      }else{
      this.router.navigate(['/chatFirebase/login'])
      }
  
  
       
     })
  
   
  }


  getmensajenombre(){
    this._sc.getMensajeNombre().subscribe(dat=>{

      console.log(dat)
    })
  }

  enviar_mensaje(){

    if(this.mensaje.length===0){
      return;
    }

      let g= Date.now();
      let e = new Date(g);
      let h =  (e.getMonth()+1)+'/'+e.getDate()+'/'+e.getFullYear()+' '+(e.getHours() > 12 ? e.getHours() - 12 : e.getHours())+':'+e.getMinutes()+' '+(e.getHours() >= 12 ? "PM" : "AM");

    /*console.log(g)
     console.log(h)
    let d=new Date();
    console.log(d.toLocaleString());*/

    this.fecha = new Date().getTime();

    let enviarMensaje: Mensaje = {
      nombre: this.user.nombre,
      mensaje: this.mensaje,
      fecha: this.fecha,
      uid: this.user.uid,
      photo:this.user.photo,
      estado:'activo'
    };

    this._sc.addMensaje(enviarMensaje)
    
    this.mensaje='';
  
  }


  logaut(){
    this._sc.logout();


  //RECORRER CHATS PARA CHAMBIAR INACTIVO
  for (const chat of this._sc.chats) {
    console.log(chat)
    
  }

    this.router.navigateByUrl('chatFirebase/login')
  
  }

}
