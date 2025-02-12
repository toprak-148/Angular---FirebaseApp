import { Product } from "./product";

export class ProductRepository{
  private products:Product[] = [
    {id:1, name:'iphone 15', price:20000,imgUrl:'1.jpeg', description:'nice stuff',   isActive:true,categoryId:1},
    {id:2, name:'iphone 16', price:21000, imgUrl:'2.jpeg',  description:'nice stuff',  isActive:true,categoryId:2},
    {id:3, name:'iphone 17', price:22000,imgUrl:'3.jpeg', description:'nice stuff',   isActive:true,categoryId:1},
    {id:4, name:'iphone 18', price:23000, imgUrl:'4.jpeg', description:'nice stuff',   isActive:true,categoryId:3}

  ];


  getProducts():any[]{
    return this.products.filter(p=>p.isActive);
  }

  getProductById(id:number) :Product|undefined
  {
    return this.products.find(p=> p.id == id);
  }

  getProductsCategoryById(id:number)
  {
    return this.products.filter(p=>p.categoryId==id);

  }

}
