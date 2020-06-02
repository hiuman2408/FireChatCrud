import { empleadoModel } from './../../../models/empleado';
import { EmpleadoService } from './../../../services/empleado.service';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators  } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  empleadoForm: FormGroup;
  estado:boolean=true;
  empleado:empleadoModel = new empleadoModel();
  cargando:boolean=false;

 listEmpleado:empleadoModel[]=[];

  constructor(private _sEmpleado:EmpleadoService) { }

  ngOnInit() {

    this.cargando=true;
    //CREAR FORMeMPLEADO
    this.empleadoForm =this.crearFromGroup();

    //CARGAR LOS EMPLEADOS
     this.listaEmpleado();
  }


  //CARGAR EMPLEADO

  listaEmpleado(){
    this._sEmpleado.getEmpleados().subscribe(resp=>{
      if(resp){
        this.cargando=false;
        const empleadoFiestore:empleadoModel[]=[]; 
      resp.forEach(element => { 
        const url:string =element.name;
        const  idDoc = url.substr(-20)
        const m:empleadoModel =element.fields;
             m.id=idDoc;
             m.nombre=element.fields.nombre.stringValue;
             m.apellidos=element.fields.apellidos.stringValue;
             m.email=element.fields.email.stringValue;
             m.cargo=element.fields.cargo.stringValue;
             m.estado=element.fields.estado.booleanValue; 
            empleadoFiestore.push(m);
      });
      this.listEmpleado = empleadoFiestore;


      }else{
        this.cargando=false;
      }
      
      
    
    },errr=>{
      console.log(errr)
    })

  }


  //CREAR EMPLEADO
  crearEmpleado(){

    if(this.empleadoForm.invalid){
      console.log("form no valido")
      return;
    }

    this.empleado=this.empleadoForm.value;
    this.empleado.estado=this.estado;
      console.log(this.empleado)
    this._sEmpleado.crearEmpleado(this.empleado).subscribe(res=>{

         
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardo con exito',
          showConfirmButton: false,
          timer: 2000
        })
        this.listaEmpleado();

        this.empleadoForm =this.crearFromGroup();

      })
    
   
    
  }

  //ELIMINAR ELMPLEADO

  eliminarEmpleado(idEmpleado:string){

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
        
        this._sEmpleado.eliminarEmpleado(idEmpleado).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Eliminado con exito.',
            'success'
           
            
          )

          this.listaEmpleado();

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



  crearFromGroup(){

    return new FormGroup({
      nombre:  new FormControl('',[Validators.required,Validators.minLength(4)]),
      apellidos:  new FormControl('',[Validators.required,Validators.minLength(8)]),
      email:  new FormControl('',[Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      cargo:  new FormControl('ingeniero'),
     

    })
  }

  resetearForm(){
    this.empleadoForm.reset();
    
  }

   //para poder hacer referencia en nuestro formulario HTML, binding 
   get nombre() { return this.empleadoForm.get('nombre'); }
   get apellidos() { return this.empleadoForm.get('apellidos'); }
   get poder() { return this.empleadoForm.get('poder'); }
   get email() { return this.empleadoForm.get('email'); }
   get cargo() { return this.empleadoForm.get('cargo'); }



}
