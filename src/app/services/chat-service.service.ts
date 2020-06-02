
import { Mensaje } from 'src/app/interface/mensaje';


import { Injectable } from '@angular/core';
import {map}from 'rxjs/operators';
import { Observable } from 'rxjs';
//impotaciones
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  //user$: Observable<firebase.User>;

  public proveedor:string;
  public chats:Mensaje[]=[];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.proveedor ='';
 
        
   }

  

  //CARGAR MENSAJES POR ESATDO

  cargarMensaje(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.where('estado', '==', 'activo').orderBy("fecha", "desc").limit(5))

    return  this.itemsCollection.valueChanges()
                                .pipe(
                                  map((mensajes:Mensaje[])=>{

                                    this.chats=mensajes.reverse();//invierte la posicion del areglo

                                  
          
                                  })
                                  );
  }

  //CARGAR MENSAJES POR NOMBRE 
  getMensajeNombre(): Observable<Mensaje[]>{

     
    return this.afs.collection<Mensaje>('chats',ref=>ref.where('estado', '==', 'activo').
                                                        orderBy('fecha','desc').limit(5)).
                                                        snapshotChanges().pipe(
                                                          map(data => {
                                                            
                                                            return data.map(d=>{
                                                    
                                                              const  j = d.payload.doc.data();
                                                                     j.idDoc = d.payload.doc.id;
                                                                    // console.log(j.idDoc)
                                                              //const id = d.payload.doc.id;    
                                                             return  j
                                                            })
                                                          }))    
    
  }

  //AGREGAR MENSAJE
  addMensaje(mensaje:Mensaje) {

    this.itemsCollection.add(mensaje)
                        .then(() => console.log("mensaje enviado"))
                        .catch((err) => console.error("Mensaje no enviado", err));
;
  }


  //LOGIN CON USUARIO Y CONTRASEÑA
  loginWithEmailAndPassword(email:string, password:string) {
  
    localStorage.setItem('proveedor', "invitado");

    this.afAuth.auth.signInWithEmailAndPassword(email, password);

  }

  //LOGIN CON REDES SOCIALES
   login(proveedor:string) {

    this.proveedor = proveedor;
    localStorage.setItem('proveedor', this.proveedor);
    
    switch (proveedor) {
      case "google":

        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case "twitter":
        this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        break;
     case "facebook":
          this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
          break;

     
    }

    
  }

 //METODO DE SALIR DE LA APLICACION
  logout() { 
    this.afAuth.auth.signOut();
    localStorage.removeItem('proveedor');
    
  }

  //METODO GETUSUARIO LOGEADO

  getAuth(){
    return this.afAuth.authState.pipe(map(auth=>{
      return auth;
    }));
  }


 



  


 

}
