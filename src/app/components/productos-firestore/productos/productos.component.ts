import { Router } from '@angular/router';

import { ProductoService } from './../../../services/producto.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mProducto } from 'src/app/models/producto.models';
import Swal from 'sweetalert2';
import { timeoutWith } from 'rxjs/operators';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  
  guardar:boolean;  //para ver si mostarmos el boton de guardar o actualizar
  cargando:boolean=true; //para el looding 
  productos:mProducto; //modelo de productos para enviar al services
  searchValue:string=''; //para en ngmodel de buscar

  listaProdcutos: mProducto[] = []; //areglo ded productos para mostaraar el el ht
 
  productoForm: FormGroup; //formgroup referencia al html
  
  constructor(private _sP:ProductoService,
                private router:Router) {
   
   
    this.guardar= true;
    
    this.productos = new mProducto('')
    this.getProductos();

    
   }

  ngOnInit() {

  
 }


  modalNuevo(){
    this.productoForm = this.crearFromGroup();
    this.guardar=true;
    this.resetearForm();
  }


  modalActualizar(idPro:string){
    this.guardar= false;
    this._sP.getProducto(idPro).subscribe(data=>{

      //console.log(data)
      this.productos = data;
      console.log(this.productos)
      this.productoForm = this.crearFromGroup();
      

    })
  
  }


  //OBTENER LISTA DE PRODUCTOS

  getProductos(){
    
    //traer los datos de usuarios
  this._sP.getAllProdcutos().subscribe(data=>{
    this.listaProdcutos = data;
   })
   this.cargando=false;
}



  //GUARDO PRODUCTOS 
  guardarProducto(){


    if(this.productoForm.invalid){
      return;
    }
    this.productos = this.productoForm.value;

    this._sP.saveProducto(this.productos)

    Swal.fire({
      position: 'center',
      icon: 'success',
      text:'se actualizo correectamente',
      showConfirmButton: false,
      timer: 1500
    })
      

    this.productoForm.reset();
    
    
  }

  //ACTUALIZAR PRODCUTOS

  actualizarProducto(idProd:string){

     const prodKey=this.productos.id;
    this.productos = this.productoForm.value;

    this._sP.updateProducto(prodKey,this.productos).then(()=>{

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.productos.nombre,
        text:'se actualizo correectamente',
        showConfirmButton: false,
        timer: 1500
      })

      //this.productoForm.reset();
     
     
    })
    
    console.log(prodKey)
    console.log(this.productos)
    this.productoForm.reset();


  }
  
  ////ELIMINAR PRODUCTO

  eliminarProducto(idProducto:string){

    Swal.fire({
      title: 'ELIMINAR?',
      text: "esta seguro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'eliminar'
    }).then((result) => {
      if (result.value) {
        
        this._sP.deleteContacto(idProducto).then(()=>{
         
          Swal.fire(
            'Deleted!',
            'Eliminado con exito.',
            'success'
           
            
          )

          this.getProductos();

        },error=>{

          Swal.fire(
            'Deleted!',
            'No se pudo Eliminar.',
            'warning'
          )
        })
        
      }
    })
  }

  //BUSCAR POR NOMBRE DE PRODCUTO
  buscarByNombre(){

    this._sP.buscarProducto(this.searchValue).subscribe(data=>{
      this.listaProdcutos=data;
    })
   
  }





  resetearForm(){
    this.productoForm.reset();
    
  }

  //CREAR FORMULARIO PRODUCTO

  crearFromGroup(){

    return new FormGroup({

     idProducto:new FormControl({value:this.productos.id,disabled:true},[Validators.required]),
     nombre:new FormControl(this.productos.nombre,[Validators.required]),
     categoria :new FormControl(this.productos.categoria,[Validators.required]),
     precio:new FormControl(this.productos.precio,[Validators.required]),
     stock:new FormControl(this.productos.stock,[Validators.required]),

    })
  }
   //para poder hacer referencia en nuestro formulario HTML, binding 
   get idProducto() { return this.productoForm.get('idProducto'); }
   get nombre() { return this.productoForm.get('nombre'); }
   get categoria() { return this.productoForm.get('categoria'); }
   get precio() { return this.productoForm.get('precio'); }
   get stock() { return this.productoForm.get('stock'); }
  
}
