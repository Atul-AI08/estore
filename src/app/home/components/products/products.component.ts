import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { ProductStoreItem } from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, JsonPipe, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(public productsStore: ProductStoreItem){}
}
