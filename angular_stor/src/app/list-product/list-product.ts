import { Component, signal,effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { CartAndPurshes } from '../cart_and_purshes';
import { ProductService } from '../products_from_php';
interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  units_ticken:number;
}
@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule,NgIf,NgFor],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css'
})
export class ListProduct implements OnInit{
  constructor(private cart:CartAndPurshes,private productService:ProductService){
     effect(() => {
      console.log("Cart items changed:", this.cart.items());
      this.processedListProduct.set(Object.values(this.cart.items()))
    });
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      //next is like if the request is good
      next: (data) => {
        this.cart.items.set(data)
        // this.products.set(data);
        console.log('Products from app.ts:', this.cart.items());
      },
      //error if its does go good
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }
processedListProduct = signal<any[]>([]);

add_item_to_cart(item:CartItem){
  this.cart.cart_items_count.set(this.cart.cart_items_count() + 1);
  this.cart.cart_items.update(arr => [...arr,item]);
}
remove_item(id:number){
  this.cart.cart_items_count.set(this.cart.cart_items_count() - 1);
  this.cart.cart_items.update(items => items.filter(item => item.product_id !== id));
}
getQuantity(productId: number): number {
  const product = this.cart.cart_items().find(p => p.product_id === productId);
  return product ? product.units_ticken : 0;
}


}
