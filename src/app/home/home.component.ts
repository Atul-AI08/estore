import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { SearchKeyword } from './types/searchKeyword.type';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CatnavigationComponent, SidenavigationComponent, ProductsComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CategoryService, CategoriesStoreItem, ProductStoreItem, ProductsService]
})
export class HomeComponent {
  constructor(private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductStoreItem
  ){
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }

  onSelectCategory(categoryId: number): void{
    this.productsStoreItem.loadProducts('maincategoryid='+categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword){
    this.productsStoreItem.loadProducts('maincategoryid='+searchKeyword.categoryId + '&' + 'keyword='+searchKeyword.keyword)
  }
}
