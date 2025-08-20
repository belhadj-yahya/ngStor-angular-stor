import { Component, signal, SimpleChanges } from '@angular/core';
import { CartAndPurshes } from '../cart_and_purshes';
import { ProductService } from '../products_from_php';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { OnChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { Info_users } from '../user_info';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  units_ticken:number;
}
@Component({
  selector: 'app-cart',
  imports: [NgIf,NgFor,NgClass],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit,OnChanges {
  total_amount = signal<number>(0)
  array_to_Send = signal<any[]>([]);
  buy_one_time:boolean = false;
  final_message = false;
  block_message = signal<boolean>(false)
  constructor(protected cart: CartAndPurshes,protected http:ProductService,protected the_user:Info_users,private rout:Router){}
  ngOnInit(): void {
    if(this.the_user.user() == null){
      this.rout.navigate(["/login"]);
    }
    const total = this.cart.cart_items().reduce((acc, item) => {
    return acc + (item.product_price * item.units_ticken);
  }, 0);
    this.total_amount.set(total);
    console.log(this.total_amount())
  }
  ngOnChanges(): void {
    this.ngOnInit()
  }
  change_amount(index:number,change:number,price:number){
    console.log(this.cart.cart_items()[index].units_ticken)
    console.log(this.cart.cart_items()[index].product_quantity)
    console.log(change)
    if(this.cart.cart_items()[index].units_ticken >= this.cart.cart_items()[index].product_quantity && change > 0){
        console.log("change is bigger then 0 we are in if")
        return
    }else{
      console.log("we are in if else")
      this.cart.cart_items_count.set(this.cart.cart_items_count() + change);
      this.total_amount.set(this.total_amount() + (change * price))
      this.cart.cart_items()[index].units_ticken = this.cart.cart_items()[index].units_ticken + change; 
      if(this.cart.cart_items()[index].units_ticken == 0){
        this.cart.cart_items.update(itme => itme.filter((_,array_index) => array_index !== index));
        console.log(this.cart.cart_items)
      }
    }
  }
  buy_products(){
    if(this.the_user.user()?.blocked == 'Yes'){
      this.block_message.set(true);
      return;
    }else{
      if(this.buy_one_time){
        return;
      }
      this.buy_one_time = true;
      console.log("button clicked")
      if(typeof this.array_to_Send()[0] !== "number"){
        this.array_to_Send.set([this.the_user.user()?.user_id, "add_order" ,...this.cart.cart_items()])
      }
      console.log(this.array_to_Send())
        this.http.buyProducts(this.array_to_Send()).subscribe({
            next:(response) => {
              this.final_message = true;
              setTimeout(() => {
                console.log(response)
              this.cart.cart_items.set([])
              this.array_to_Send.set([])
              this.total_amount.set(0);
              this.cart.cart_items_count.set(0)
              this.buy_one_time = false;
              }, 1000);
            },
            error:(err) => {
              console.log("we are in error")
              console.log(err)
              this.buy_one_time = false;
            },
        })
    }
  }
}
