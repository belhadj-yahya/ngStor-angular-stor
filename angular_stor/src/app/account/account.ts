import { Component } from '@angular/core';
import { Info_users } from '../user_info';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { User } from '../user_request';

@Component({
  selector: 'app-account',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit{
constructor(protected users:Info_users,protected router:Router,protected request:User){}
ngOnInit(): void {
  if(this.users.user() == null){
    console.log("we are in if user is null")
    this.router.navigate(["/login"]);
    return
  }
  

}
}
