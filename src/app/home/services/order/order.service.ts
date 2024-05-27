import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order, OrderItem } from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user-service.service';
import { PastOrder, PastOrderProduct } from '../../types/order.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cartStore: CartStoreItem
  ) { }

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any>{
    const url: string = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStore.cart.products.forEach(product => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount
      };
      orderDetails.push(orderItem);
    })

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };
    return this.http.post(url, order, {
      headers: {authorization: this.userService.token},
    });
  }

  getOrders(userEmail: string): Observable<PastOrder[]>{
    const url:string = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`;
    return this.http.get<PastOrder[]>(url, {
      headers: {authorization: this.userService.token},
    });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]>{
    const url:string = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`;
    return this.http.get<PastOrderProduct[]>(url, {
      headers: {authorization: this.userService.token},
    });
  }
}
