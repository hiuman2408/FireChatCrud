import { heroeModel } from './../models/heroe.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroeServiceService {

  private url = 'https://firechat-dc7b1.firebaseio.com';

  constructor(private http: HttpClient ) { }


//DATABASE REALIME

  crearHeroe(heroe:heroeModel){

    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );

  }

  actualizarHeroe( heroe: heroeModel ) {

    const heroeTemp = {
      nombre:heroe.nombre,
      poder:heroe.poder,
      vivo:heroe.vivo
    };

  
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);


  }

  

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( heroesObj: object ) {

    if( heroesObj){
      const heroes: heroeModel[] = [];
    Object.keys( heroesObj ).forEach( key => {
      const heroe: heroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );
    });


    return heroes;

    }else{
      return;
    }
    

  }


  
  getHeroeRealtime( id: string ) {

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }


  getHeroesAll() {

    return this.http.get(`${ this.url }/heroes.json`)
    
  }


  eliminarHeroe( id: string ) {

    return this.http.delete(`${ this.url }/heroes/${ id }.json`);

  }


  


  





}
