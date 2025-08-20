import { Component, signal } from '@angular/core';
import { AdminService } from '../admin-service';
import { OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { Info_users } from '../user_info';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-main',
  standalone:true,
  imports: [JsonPipe, NgFor,NgClass],
  templateUrl: './admin-main.html',
  styleUrl: './admin-main.css'
})
export class AdminMain implements OnInit {
  data = signal<any>('');

  constructor(private admin_requests:AdminService,private user:Info_users,private rout:Router){}
  ngOnInit(): void {
    if(this.user.user() == null || this.user.user()?.user_role == "client"){
      this.rout.navigate(["/account"])
    }
    console.log("we are in inti in admin-main")
    this.admin_requests.get_data("http://localhost/backend_php/api/admin.php?action=start_page").subscribe({
      next:(response) => {
        console.log("we are in next from admin-main");
        this.data.set(response) 
        console.log(response)
      },
      error(err) {
        console.log(err)
      },
    })
  }
  change_block(index:number,id:number){
    const users = this.data().users.map((u:any[])=> ({ ...u }));
    users[index].blooked = users[index].blooked === "No" ? "Yes" : "No";
    this.data.set({
      ...this.data(),
      users        
    });
    this.admin_requests.get_data("http://localhost/backend_php/api/admin.php?action=change_block&id="+id+"&value="+users[index].blooked).subscribe({
      next(value) {
        console.log(value)
      },
      error(err) {
        console.log(err)
      },
    });
  }

}
