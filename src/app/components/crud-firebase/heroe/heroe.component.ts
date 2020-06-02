import { HeroeServiceService } from './../../../services/heroe-service.service';
import { heroeModel } from './../../../models/heroe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators  } from '@angular/forms';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:heroeModel = new heroeModel();

  HeroeForm: FormGroup;
  idHeroe:any;

  constructor(private route:ActivatedRoute,
              private rou:Router,
           private _sh:HeroeServiceService) {

            
            }

  ngOnInit() {

    
    this.HeroeForm =this.actualizarFromGroup()
    this.idHeroe = this.route.snapshot.paramMap.get('id');
    if ( this.idHeroe !== 'new' ) {

      //PARA BASE DE DATOS REALTIME
      
      this._sh.getHeroeRealtime( this.idHeroe )
        .subscribe( (resp: heroeModel) => {
          this.heroe = resp;
          this.heroe.id = this.idHeroe;
          this.HeroeForm =this.actualizarFromGroup();

          //console.log(this.heroe)
        })


      
    }

    
   
  }

  

  actualizarFromGroup(){

    return new FormGroup({
      id:  new FormControl({value:this.heroe.id,disabled:true}),
      nombre:new FormControl(this.heroe.nombre,[Validators.required,Validators.minLength(3)]),
      poder: new FormControl(this.heroe.poder,[Validators.required,Validators.minLength(5)]),
     
    })
  }

  crearHeroe(){

  
    if (this.HeroeForm.valid){
        
        if(this.idHeroe !== 'new'){

          let j = this.heroe.vivo;
        this.heroe = this.HeroeForm.value
        this.heroe.id=this.idHeroe;
        this.heroe.vivo= j;

          this._sh.actualizarHeroe(this.heroe).subscribe(resp=>{

           // console.log(resp);

           this.rou.navigateByUrl("/crudFirebase/listar")
           console.log("se actualizo")

          })


        }else{

        let j = this.heroe.vivo;
        this.heroe = this.HeroeForm.value
        
        this.heroe.vivo= j;

  
         
         this._sh.crearHeroe(this.heroe).subscribe(resp=>{
            this.rou.navigateByUrl("/crudFirebase/listar")
            console.log("guardado")

           // this.heroe = resp;
           // this.HeroeForm =this.actualizarFromGroup();
           //  console.log(this.heroe)
  
          })

          
        }

       

       
      
        
        //console.log(this.heroe)

    }else{
      console.log("datosd no validos")
    }
  }


  
   //para poder hacer referencia en nuestro formulario HTML, binding 
   get idm() { return this.HeroeForm.get('id'); }
   get nombre() { return this.HeroeForm.get('nombre'); }
   get poder() { return this.HeroeForm.get('poder'); }

}
