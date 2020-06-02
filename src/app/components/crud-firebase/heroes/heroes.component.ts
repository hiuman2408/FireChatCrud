import { Mensaje } from 'src/app/interface/mensaje';

import { HeroeServiceService } from './../../../services/heroe-service.service';
import { Component, OnInit } from '@angular/core';
import { heroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';
import { error } from 'util';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 
  heroes: heroeModel[] = [];
  cargando:boolean=false;

  constructor(private _hs:HeroeServiceService) { 
   
  }

  ngOnInit() {

    this.cargando=true;

    this.cargarHeroes();

  

  }

  cargarHeroes(){
    this._hs.getHeroes().subscribe(resp=>{

      if(resp){
        //console.log(resp)
        this.heroes = resp;
        this.cargando=false;
  
      }else{
        this.cargando=false;
      }
        
      })

  }


  eliminarHeroe(iidHeroe:string){
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

        this._hs.eliminarHeroe(iidHeroe).subscribe(()=>{

          Swal.fire(
            'Deleted!',
            'Eliminado con exito.',
            'success'
           
            
          )

          this.cargarHeroes();
        },error=>{

          Swal.fire(
            'Deleted!',
              error,
            'warning'
          )

        })
        
       
        
      }
    })

  }

}


/* this._hs.getHeroesAll().subscribe(resp=>{
         
      //console.log(resp)
      const heroess: heroeModel[] = [];
      Object.keys(resp).forEach((key) => {
        const heroe: heroeModel = resp[key];
              heroe.id = key;
              heroess.push( heroe );
      });

      this.heroes=heroess;
      this.cargando=false;

      //console.log(this.heroes)

    })*/
