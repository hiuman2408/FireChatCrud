import { empleadoModel } from './../models/empleado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private url='https://firestore.googleapis.com/v1/projects/firechat-dc7b1/databases/(default)/documents';

  constructor(private http:HttpClient) { }



   //FIRESTORE 
   getEmpleados(){
    return this.http.get(`${ this.url }/empleados`).pipe(map((data:any)=>{
    return data.documents

    }))
  }

  //OBTENER UN EMPLEADO
  getEmpleado(idEmpleado:string){
    
    return this.http.get(`${ this.url }/empleados/${idEmpleado}`);

  }

  //CREAR EMPLEADO
  crearEmpleado(empleado:empleadoModel){
    const tempempleado =  {
      "fields": {
        "nombre": {
          "stringValue": empleado.nombre
        },
        "apellidos": {
          "stringValue": empleado.apellidos
        },
        "email": {
          "stringValue": empleado.email
        },
        
        "cargo": {
          "stringValue": empleado.cargo
        },
        "estado": {
          "booleanValue": empleado.estado
        }
      }
    };

    return this.http.post(`${ this.url }/empleados`,tempempleado)
  }

  //ACTUALIZAR EMPLEADO


  actualizarEmpleado(empleado:empleadoModel){
    const tempempleado =  {
      "fields": {
        "nombre": {
          "stringValue": empleado.nombre
        },
        "apellidos": {
          "stringValue": empleado.apellidos
        },
        "email": {
          "stringValue": empleado.email
        },
        
        "cargo": {
          "stringValue": empleado.cargo
        },
        "estado": {
          "booleanValue": empleado.estado
        }
      }
    };

    return this.http.patch(`${ this.url }/empleados/${empleado.id}`,tempempleado)
  }


  //ELIMINAR EMPLEADO

  eliminarEmpleado(idEmpleado:string){

    return this.http.delete(`${ this.url }/empleados/${idEmpleado}`);
  }



  


}
