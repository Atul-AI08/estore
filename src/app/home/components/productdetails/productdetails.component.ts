import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent, CurrencyPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit, OnDestroy{
  product: Product;
  productLoaded: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService){}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product[0];
        this.productLoaded = true;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
