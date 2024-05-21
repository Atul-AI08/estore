import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { AsyncPipe } from '@angular/common';
import { ProductStoreItem } from '../../services/product/products.storeItem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(public productsStore: ProductStoreItem){}
}
