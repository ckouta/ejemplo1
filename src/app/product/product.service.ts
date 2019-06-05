import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Iproduct } from '../producto';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public filteredProducts: Iproduct[];
  public products: Iproduct[];
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>('http://localhost:3000/productos').pipe(map((res: any) => res.data));
  }
  saveProduct(product: Iproduct){
    return this.http.post<Iproduct[]>('http://localhost:3000/producto', product);
  }
  deleteProduct(id){
    return this.http.delete('http://localhost:3000/producto/'+ id );
  }
  updateProduct(id, product){
    return this.http.put('http://localhost:3000/producto/'+ id, product);
  }
  rand_code(chars, lon): string{
    let code = "";
    for(let x=0; x < lon;x++){
      let rand = Math.floor(Math.random()* chars.length);
      code+= chars.substr(rand,1);
    }
    return code;
  }
  generarCodigo(){
    return this.rand_code('ABCDEFGIHJKLMNOPQRSTUVWXYZ',3)+ '-'+ this.rand_code('0123456789',4)
  }
}
