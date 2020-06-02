

import { mProducto } from 'src/app/models/producto.models';
import { Observable } from 'rxjs';
import { Producto } from './../interface/producto';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 
  private itemsCollection: AngularFirestoreCollection<Producto>;
  constructor(private afs:AngularFirestore) {

    this.itemsCollection = afs.collection<Producto>('Productos');

   }

   //GUARDAR PRODCUTOS
   saveProducto(producto:Producto){

    this.itemsCollection.add(producto);

  }

  //GET PRODUCTO PARA ACTUALIZAR

  getProducto(contactoKey):Observable<any>{
    return this.afs.collection('Productos').doc(contactoKey).snapshotChanges().pipe(
      map((data:any) => {

        //console.log(data)

        const  j = data.payload.data();
                 j.id = data.payload.id;
                 return new mProducto(j)
        
      }));
  }

  //ACTUALIZAR PRODCUTO
  updateProducto(userKey:string, value:mProducto){

     return this.afs.collection('Productos').doc(userKey).set(value);
   }
 
   //ELIMINAR PRODUCTO
   deleteContacto(userKey:string){
    
    return this.afs.collection('Productos').doc(userKey).delete();
 
   }

  //OBTENER TODOS LOS PRODCUCTOS

  getAllProdcutos(): Observable<Producto[]>{
     
    return this.afs.collection<Producto>("Productos").snapshotChanges().pipe(
      map(data => {
        //console.log(data)
        return data.map(d=>{
          const  j = d.payload.doc.data();
                 j.id = d.payload.doc.id;

          //const id = d.payload.doc.id;
          
         return new mProducto(j)

        })
      }))

    
  }

  //BUSCAR POR NOMBRE DE PRODUCTO
  buscarProducto(searchValue):Observable<Producto[]>{
    return this.afs.collection<Producto>('Productos',ref => ref.where('nombre', '>=', searchValue)
      .where('nombre', '<=', searchValue + '\uf8ff'))
      .snapshotChanges().pipe(
        map(data => {
          //console.log(data)
          return data.map(d=>{
            const  j = d.payload.doc.data();
                   j.id = d.payload.doc.id;
  
  
            //const id = d.payload.doc.id;
            
           return new mProducto(j)
  
          })
        }))
  }





}
