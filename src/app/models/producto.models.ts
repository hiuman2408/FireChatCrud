import { Producto } from './../interface/producto';
import * as _ from 'lodash';



export class mProducto implements Producto {


    constructor(data){
        _.set(this, 'data', data);
    }

    get nombre(): string{
        return _.get(this, 'data.nombre');
    }

    get categoria(): string{
        return _.get(this, 'data.categoria');
    }

    get precio(): number{
        return _.get(this, 'data.precio');
    }

    get  stock(): number {
        return _.get(this, 'data.stock');
    }

    get  id(): string {
        return _.get(this, 'data.id');
    }



}