import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent, CurrencyPipe, FaIconComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit, OnDestroy{
  product: Product;
  productLoaded: boolean = false;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem
  ){}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product[0];
        this.productLoaded = true;
      })
    );
  }

  addToCart(): void{
    this.cart.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
