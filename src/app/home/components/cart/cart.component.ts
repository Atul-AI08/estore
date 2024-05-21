import { Component } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { CartItem } from '../../types/cart.type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FaIconComponent, AsyncPipe, CurrencyPipe, RatingsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  faTrash = faTrash;

  constructor(
    public cartStore: CartStoreItem,
    private router: Router
  ){}

  navigateToHome(): void{
    this.router.navigate(['/home/products']);
  }

  increaseProductQuantity(cartItem: CartItem): void{
    this.cartStore.addProduct(cartItem.product);
  }

  decreaseProductQuantity(cartItem: CartItem): void{
    this.cartStore.decreaseProductQuantity(cartItem);
  }

  removeCartItem(cartItem: CartItem): void{
    this.cartStore.removeProduct(cartItem);
  }
}
