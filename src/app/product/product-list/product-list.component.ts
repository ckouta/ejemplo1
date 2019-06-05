import { Component, OnInit, Input } from '@angular/core';
import { Iproduct } from 'src/app/producto';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  
})

export class ProductListComponent implements OnInit {
 //@Input('datos') public products:Iproduct[];
  showImage: boolean =false;
  today: number = Date.now();
  constructor( private productService : ProductService){
    this.productService.getProducts().subscribe((res:any[]) => {
      this.productService.products = res;
      this.productService.filteredProducts = res;
      console.log(this.productService.products);
     },
     err => console.log(err)
     )
  }
  toggleImage(): void{
    this.showImage= !this.showImage;
    
    
  }
  ngOnInit() {
  }
  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe(() =>{
      return this.productService.getProducts().subscribe((res:any[]) => {
        this.productService.products = res;
      },
      err => console.log(err));
    })
  }
  updateProduct(id:number, producto:Iproduct){
    let datos:any = {
      productName	: 'Producto' + Math.round(Math.random()* (100-1) + 1),
      productCode: this.productService.generarCodigo(),
      releaseDate: '2019-03-07',
    price: Math.round(Math.random() *(130 -20)+ 20),
    description: 'Producto de prueba',
    starRating: Math.round(Math.random()*(200-1) + 1),
    imageUrl: ''
    }
    //console.log(datos);
    this.productService.updateProduct(id,datos).subscribe(() =>{
      return this.productService.getProducts().subscribe((res: any[]) => {
        this.productService.products = res;
      },
      err => console.log(err));
    })
  };

}
