import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { Info_users } from '../user_info';
import { User } from '../user_request';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, NgFor,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login{
  constructor(protected user_in_app: Info_users,protected user:User,protected route:Router){}
  show_error = signal<string>('')
  login_form = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(4)]),
    action : new FormControl("log_in")
  })
  submit(){
    if(this.login_form.valid){
      this.user.log_in(this.login_form.value).subscribe({
          next: (value) => {
            if(value.success == true){
              this.user_in_app.user.set({user_id:value.user.user_id,user_f_name:value.user.user_f_name,user_l_name:value.user.user_l_name,user_email:value.user.user_email,user_role:value.user.role,blocked:value.user.blooked});
              if(this.user_in_app.user()?.user_role == "client"){
                  this.route.navigate(["/account"]);
              }else if(this.user_in_app.user()?.user_role == "admin"){
                this.route.navigate(["/admin"]);
              }
            }else{
            this.show_error.set(value.user)
            }
          },
          error:(err) => {
            console.log(err)
          },
      })
    }
  }
}
