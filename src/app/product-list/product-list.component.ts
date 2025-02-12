import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

  //! product servisi local bir servis olarak tanımladığımızdan kaynaklı hangi componentte kullanacaksak o componentte provides olarak tanımalamlıyız.
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {



  products:Product[] = [ ];
  loading:boolean = false;


  constructor(private route:ActivatedRoute , private productService:ProductService) { }

  ngOnInit(): void {
     this.route.params.subscribe(params=>{
      this.loading = true;
      this.productService.getProducts(params['categoryId']).subscribe(data=>{
        this.products = data;
        this.loading = false;
      });

     });
  }
}
