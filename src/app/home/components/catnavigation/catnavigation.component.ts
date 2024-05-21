import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../types/category.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {
  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>;

  displayOptions: boolean = true;

  onCategoryClicked(category: Category){
    this.categoryClicked.emit(category.id);
  }

  constructor(public categoryStore: CategoriesStoreItem, private router: Router){
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      this.displayOptions = (event as NavigationEnd).url === '/home/products'? true: false;
    })
  }
}
