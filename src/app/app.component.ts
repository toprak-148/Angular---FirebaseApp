import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  //! tanımladigimiz servis local bir servis oldugu icin hangi componentte kullanıyor isek provides kisminda servisi tanimlamaliyiz.
  providers:[ProductService]
})
export class AppComponent {
   private title = 'Home Page';
   url:string  = 'https://ng-shop-repait-default-rtdb.firebaseio.com/';

   constructor(private http : HttpClient , private productService:ProductService) {


   }

    getTitle():string{
      return this.title;
   }







}













