import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { CartItem, DeliveryAddress } from '../../types/cart.type';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/users/user-service.service';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FaIconComponent, AsyncPipe, CurrencyPipe, RatingsComponent, ReactiveFormsModule, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{
  faTrash = faTrash;
  orderForm: FormGroup;
  user: loggedInUser;
  subscription: Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService
  ){
    this.user = {
      firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        email: '',
    };

    this.subscription.add(
      userService.loggedInUser$.subscribe(loggedInUser => {
        if (loggedInUser.firstName){
          this.user = loggedInUser;
          console.log(loggedInUser);
        }
      })
    );
  }

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

  onSubmit(): void{
    if (this.userService.isUserAuthenticated){
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value,
      };
      this.subscription.add(
        this.orderService
        .saveOrder(deliveryAddress, this.user.email)
        .subscribe({
          next: result => {
            this.cartStore.clearCart();
            this.alertType = 0;
            this.alertMessage = 'Order registered successfully!';
            this.disableCheckout = true;
          },
          error: (error) => {
            this.alertType = 2;
            if (error.error.message === 'Autentication failed!'){
              this.alertMessage = 'Please log in to register your order.';
            }else{
              this.alertMessage = error.error.message;
            }
          }
        })
      )
    }
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      pin: [this.user.pin, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
