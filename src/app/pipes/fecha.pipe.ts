import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string):any {

    //let g= Date.now();
      let e = new Date(value);
      let h =  ((e.getMonth()+1)>9? (e.getMonth()+1): '0'+ (e.getMonth()+1)) +'/'+
                 (e.getDate()>10 ? e.getDate():'0'+e.getDate() )+'/'+
                 e.getFullYear()+' '+
                (e.getHours() > 12 ? e.getHours() - 12 : e.getHours())+':'+
                 e.getMinutes()+' '+
                (e.getHours() >= 12 ? "pm" : "am");

    return h;
  }

}
