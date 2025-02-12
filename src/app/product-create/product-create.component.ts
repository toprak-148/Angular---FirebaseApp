import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/models/product';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from 'src/models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers:[CategoryService,ProductService]
})
export class ProductCreateComponent implements OnInit {

  categories:Category[]= [];
  error:string = "";
  // kontrol icinde bir degisiklik yapilmasinda bu isleme two-way-binding denir
  model:any = {
    name:'iphone 17',
    price:20000,
    categoryId:'0',

  };

  //ngForm => form
  // valid - invalid





  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;

    })

  }


  // saveProduct(name:any,price:any,imgUrl:any,description:any,isActive:any,categoryId:any){
  saveProduct(form:NgForm){

    const product:Product = {
      id:1,
      name:this.model.name,
      price:this.model.price,
      imgUrl:this.model.imgUrl,
      description:this.model.description,
      isActive:this.model.isActive,
      categoryId:this.model.categoryId
    }
    const extensions = ['jpeg','jpg','png'];
    const extension = this.model.imgUrl.value.split('.').pop();

    if(extensions.indexOf(extension) == -1 )
    {
      this.error = 'resim uzantisi sadece jpeg , jpg ,png olmalidir.';
      return;
    }

    if(this.model.categoryId.value == '0')
    {
      this.error = ("kategori secmelisiniz.")
      return;
    }

    if(this.model.valid){
      return this.productService.createProduct(product).subscribe(
        data=> {
          this.router.navigate(["/products"])
        }
      );
  }
  else{
    return;
  }




  }

}


