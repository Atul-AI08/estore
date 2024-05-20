import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe } from '@angular/common';
import { SearchKeyword } from '../../types/searchKeyword.type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FaIconComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>;

  constructor(public categoryStore: CategoriesStoreItem){}

  onClickSearch(keyword: string, categoryOption: string){
    this.searchClicked.emit({categoryId: parseInt(categoryOption), keyword: keyword});
  }
}
