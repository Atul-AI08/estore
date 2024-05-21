import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { AsyncPipe } from '@angular/common';
import { ProductStoreItem } from '../../services/product/products.storeItem';
import { RouterLink } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Product } from '../../types/products.type';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe, RouterLink, FaIconComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;

  constructor(
    public productsStore: ProductStoreItem,
    private cart: CartStoreItem
  ){}

  addToCart(product: Product){
    this.cart.addProduct(product);
  }
}
