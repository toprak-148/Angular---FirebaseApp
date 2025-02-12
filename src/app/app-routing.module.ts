import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import * as path from 'path';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'products/create', component : ProductCreateComponent},
  {path:'categories/create',component:CategoryCreateComponent},
  {path:'products',component:ProductListComponent},
  {path:'products/:productId',component:ProductComponent},
  {path:'products/category/:categoryId',component :ProductListComponent},
  {path:'account' , component:AuthComponent},
  {path:"rxjs",component:RxjsComponent}

]



@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }










