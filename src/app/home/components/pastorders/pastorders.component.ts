import { Component, OnInit, OnDestroy } from '@angular/core';
import { PastOrder, PastOrderProduct } from '../../types/order.type';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/users/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pastorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pastorders.component.html',
  styleUrl: './pastorders.component.scss'
})
export class PastordersComponent implements OnInit, OnDestroy{
  pastOrderProducts: PastOrderProduct[] = [];
  pastOrder: PastOrder;
  pastOrders: PastOrder[] = [];
  subsciptions: Subscription = new Subscription;

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ){}

  selectOrder(event: any): void{
    if (Number.parseInt(event.target.value) > 0){
      this.pastOrder = this.pastOrders.filter((order) => order.orderId === Number.parseInt(event.target.value))[0];

      this.getOrderProducts(this.pastOrder.orderId);
    } else{
      this.pastOrder = <any> undefined;
    }
  }

  getOrderProducts(orderId: number): void{
    this.subsciptions.add(
      this.orderService.getOrderProducts(orderId)
      .subscribe((products) => this.pastOrderProducts = products)
    );
  }

  ngOnInit(): void {
    this.subsciptions.add(
      this.orderService.getOrders(this.userService.loggedInUser.email).subscribe(pastOrders => {
        this.pastOrders = pastOrders;
      })
    )
  }

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }
}
