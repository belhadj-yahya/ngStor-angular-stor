import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { User } from '../user_request';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Info_users } from '../user_info';


@Component({
  selector: 'app-show-orders',
  imports: [NgFor,NgIf],
  templateUrl: './show-orders.html',
  styleUrl: './show-orders.css'
})
export class ShowOrders implements OnInit{
private api_url_for_status = '';
orders:any[] = []
  constructor(private user_request: User,private router:Router,private user_data:Info_users){}
  
  groupOrders(data: any[]):any[] {
    
  const grouped = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.order_id]) {
        acc[item.order_id] = {
          order_id: item.order_id,
          order_total: item.order_total,
          order_status:item.order_status,
          items: []
        };
      }
      acc[item.order_id].items.push({
        product_name: item.product_name,
        product_price: item.product_price,
        amount: item.amount,
        item_subtotal: item.item_subtotal
      });
      return acc;
    }, {} as any)
  );

  return grouped;
}
  ngOnInit(): void {
   if(this.user_data.user() == null){
    this.router.navigate(["/login"]);
    return
  }
  
  this.api_url_for_status = "http://localhost/backend_php/api/user.php?action=status&id="+this.user_data.user()?.user_id; 
  this.user_request.get_orders(this.api_url_for_status).subscribe({
    next: (response) => {
      this.orders = this.groupOrders(response.data)

    },
    error(err) {
      console.log(err)
    },
  })
  
  }
}

