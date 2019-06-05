import { Component, OnInit } from '@angular/core';
import { Iproduct } from './producto';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from './product/product.service';
import { ModalAddService } from './services/modal-add.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [ProductService]
})
export class AppComponent implements OnInit {
  title = ' Empresa Acme';
  _listFilter: string;
  //filterProducts: Iproduct[];
  //products: Iproduct[];
  constructor( private productService : ProductService,
              private modalAddService: ModalAddService){}
  ngOnInit(): void {
    //this.productService.filteredProducts = this.productService.products;
    this.productService.getProducts().subscribe((res:any[]) => {
     this.productService.products = res;
     this.productService.filteredProducts = res;
     console.log(this.productService.products);
    },
    err => console.log(err)
    )
  }
  /*products: Iproduct[] = [
    {
      "productId": 1,
      "productName": "zapato",
      "productCode": "23456",
      "releaseData": "",
      "price": 23500,
      "description": "zapato talla 40 ",
      "starRating": 70,
      "imageUrl": ""

    },
    {
      "productId": 2,
      "productName": "miel",
      "productCode": "453",
      "releaseData": "",
      "price": 2400,
      "description": "miel de mi abuela",
      "starRating": 120,
      "imageUrl": "https://cdn.pixabay.com/photo/2017/01/06/17/49/honey-1958464_960_720.jpg"
    }]*/

  get ListFilter(): string {
    return this._listFilter;
  }
  set ListFilter(value: string) {
    this._listFilter = value;
    this.productService.filteredProducts = this._listFilter ? this.performFilter(this.ListFilter) : this.productService.products;
  }
  performFilter(filterBy: string): Iproduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.productService.products.filter((product: Iproduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


crearProducto(){
  let datos: any = {
    name: 'Producto' + Math.round(Math.random()* (100-1) + 1),
    code: this.productService.generarCodigo(),
    date: '2019-03-07',
    price: Math.round(Math.random() *(130 -20)+ 20),
    description: 'Producto de prueba',
    rating: Math.round(Math.random()*(200-1) + 1),
    image: ''
  };
  this.guardarProducto(datos);
}
guardarProducto(producto : Iproduct){
  this.productService.saveProduct(producto).subscribe(()=>{
    return this.productService.getProducts().subscribe((res:any[]) => {
      this.productService.products = res;
      this.productService.filteredProducts = res;
    },
    err => console.log(err));
  })
}
abrirModal(){
  this.modalAddService.mostrarModal();
}
/*rand_code(chars, lon): string{
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
*/
}
