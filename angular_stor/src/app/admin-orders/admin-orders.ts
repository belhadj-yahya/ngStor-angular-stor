import { Component, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { Info_users } from '../user_info';
import { Router } from '@angular/router';
import { AdminService } from '../admin-service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  imports: [NgClass,NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrders implements OnInit {
  orders = signal<any>("");

  change_stats_form = new FormGroup({
    status: new FormControl("pending")
  })

  constructor(private user:Info_users,private rout:Router,private requests:AdminService){}
  ngOnInit(): void {
    
    if(this.user.user() == null || this.user.user()?.user_role == "client"){
      this.rout.navigate(["/account"])
      return
    }
    this.requests.get_data("http://localhost/backend_php/api/admin.php?action=orders").subscribe({
      next:(response) => {
      this.orders.set(response[0]);
      console.log("this is orders")
        console.log(this.orders())
      },
      error(err) {
        console.log(err)
      },
    })
  }
  change_status(index:number,id:number){
    let new_status = this.change_stats_form.get("status")?.value;
    this.orders.update(order => {
      order[index].order_status = new_status;
      return [...order]
    })
    this.requests.get_data("http://localhost/backend_php/api/admin.php?action=change_status&id=" + id + "&value=" + new_status).subscribe();
    console.log(this.orders())

  }
}
