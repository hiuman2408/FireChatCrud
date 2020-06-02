import { EmpleadoService } from './../../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { empleadoModel } from 'src/app/models/empleado';
import Swal from 'sweetalert2';
import { timeout, timeoutWith } from 'rxjs/operators';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  //idEmpelado:string;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  empleadoForm: FormGroup;
  empleado:empleadoModel = new empleadoModel();

  constructor(private AcRouter:ActivatedRoute,
              private router:Router ,
              private _sempleado:EmpleadoService) { 
                
              }

  ngOnInit() {

    
    const idEmpelado = this.AcRouter.snapshot.paramMap.get('id')

    if(!idEmpelado){
       return;
    }
    
    this._sempleado.getEmpleado(idEmpelado).subscribe((resp:any)=>{

    
      this.empleado.nombre=resp.fields.nombre.stringValue
      this.empleado.apellidos=resp.fields.apellidos.stringValue
      this.empleado.email=resp.fields.email.stringValue
      this.empleado.cargo=resp.fields.cargo.stringValue
      this.empleado.estado=resp.fields.estado.booleanValue
      this.empleado.id=idEmpelado;
      this.empleadoForm =this.crearFromGroup();


  
    })

    //console.log(idEmpelado)

   

  }


  actualizarEmpleado(){

    if(this.empleadoForm.invalid){
      console.log("form no valido")
      return;
    }

    let j = this.empleado.estado;
    let v= this.empleado.id;
    this.empleado = this.empleadoForm.value;
    this.empleado.estado=j;
    this.empleado.id=v;

    this._sempleado.actualizarEmpleado(this.empleado).subscribe(resp=>{
       
      if(resp){

      
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: this.empleado.nombre,
          text:'se actualizo correectamente',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          this.router.navigateByUrl('/crudFirestore/listar');
          
        }, 1500);

        
        
      }


      

    })



    
    

   // console.log(this.empleado)

  }



  crearFromGroup(){

    return new FormGroup({
      idempleado:new FormControl({value:this.empleado.id,disabled:true}),
      nombre:  new FormControl(this.empleado.nombre,[Validators.required,Validators.minLength(4)]),
      apellidos:  new FormControl(this.empleado.apellidos,[Validators.required,Validators.minLength(8)]),
      email:  new FormControl(this.empleado.email,[Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      cargo:  new FormControl(this.empleado.cargo),
     

    })
  }

  resetearForm(){
    this.empleadoForm.reset();
    
  }

   //para poder hacer referencia en nuestro formulario HTML, binding 
   get idempleado() { return this.empleadoForm.get('idempleado'); }
   get nombre() { return this.empleadoForm.get('nombre'); }
   get apellidos() { return this.empleadoForm.get('apellidos'); }
   get poder() { return this.empleadoForm.get('poder'); }
   get email() { return this.empleadoForm.get('email'); }
   get cargo() { return this.empleadoForm.get('cargo'); }

}



