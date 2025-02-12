import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { delay, exhaustMap, map, Observable, take, tap } from "rxjs";
import { Product } from "src/models/product";
import { AuthService } from "./auth.service";


//component oluşturulduğunda getirebilecek bir service olduğu için Injectable ile işaretlenmelidir.
//! local service
@Injectable()
export class ProductService{

  private url:string = 'https://ng-shop-repait-default-rtdb.firebaseio.com/';

  constructor(private route:ActivatedRoute,private http:HttpClient,private authService:AuthService){}
  getProducts(categoryId:number):Observable<Product[]>
  {
    return  this.http
                    .get<Product[]>(this.url + 'products.json')
                    .pipe(
                      map(data =>{
                        const products:Product[] = [];
                        for(const key in data)
                        {
                          if(categoryId){
                              if(categoryId == data[key].categoryId)
                              {
                                products.push({...data[key],id:key});
                              }
                          }
                          else
                          {
                            products.push({...data[key],id:key});
                          }


                        }
                        return products;
                      }),
                      tap(data=>{console.log(data)}),
                      //delay product'lar yuklenirken bir zaman yaratir.
                      delay(1000)
                    )

  }

  getProductById(id:string):Observable<Product>
  {
    return this.http.get<Product>(this.url+'products/' + id + '.json').pipe(delay(1000));

  }

  createProduct(prd:Product):Observable<Product>{

    return this.authService.user.pipe(
      take(1),
      tap(user => console.log(user)),
      exhaustMap(user=>{

        return this.http.post<Product>(this.url + 'products.json?auth='+ user?.getToken(),prd);

      })
    )


  }










}


















