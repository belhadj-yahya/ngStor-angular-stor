import { Injectable, signal } from "@angular/core";
import { OnChanges } from "@angular/core";

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  units_ticken:number;
}
@Injectable({
    providedIn: "root"
})
export class CartAndPurshes implements OnChanges{
    test: string = "yahya";
    cart_items_count = signal<number>(0);
    cart_items = signal<any[]>([]);
    items = signal<CartItem[]>([])
    ngOnChanges(): void {
      console.log(this.items)
    }

}