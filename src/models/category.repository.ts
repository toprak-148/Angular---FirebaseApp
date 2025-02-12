import { Category } from "./category";

export class CategoryRepository{

  private categories:Category[] = [
    {id:1,name:'telefon'},
    {id:2,name:'bilgisayar'},
    {id:3,name:'televizyon'}
  ];

  getCategories():Category[]
  {
    return this.categories;
  }

  getCategoriesById(id:number)
  {
    return this.categories.find(p=>p.id == id);

  }



}
