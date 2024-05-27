import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { faSearch, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe } from '@angular/common';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users/user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FaIconComponent, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy{
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  subscription: Subscription = new Subscription();
  displaySearch: boolean = true;

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>;
  isUserAuthenticated: boolean = false;
  userName: string = '';

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cartStore: CartStoreItem,
    private userService: UserService
  ){
    router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event) => {
      this.displaySearch = (event as NavigationEnd).url === '/home/products'? true: false;
    });

    this.subscription.add(this.userService.isUserAuthenticated$.subscribe((result) => {
      this.isUserAuthenticated = result;
    }));

    this.subscription.add(this.userService.loggedInUser$.subscribe((result) => {
      this.userName = result.firstName;
    }))
  }

  onClickSearch(keyword: string, categoryOption: string){
    this.searchClicked.emit({categoryId: parseInt(categoryOption), keyword: keyword});
  }

  pastOrders(): void{
    this.router.navigate(['home/pastorders']);
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['home/products']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
