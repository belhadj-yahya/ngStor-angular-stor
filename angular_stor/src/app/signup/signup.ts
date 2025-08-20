import { Component, signal } from '@angular/core';
import { User } from '../user_request';
import { Info_users } from '../user_info';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit{
  error = signal<string | null>(null);
  constructor(private request:User,protected users:Info_users,private rout:Router){}
  sign_up_form = new FormGroup({
    first_name : new FormControl('',[Validators.required,Validators.maxLength(12)]),
    last_name : new FormControl('',[Validators.required,Validators.maxLength(12)]),
    email : new FormControl("",[Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl('',[Validators.required,Validators.maxLength(50),Validators.minLength(5)]),
    confirm_password: new FormControl('',[Validators.required,Validators.maxLength(50),Validators.minLength(5)]),
    action : new FormControl("sign_up")
  })
  ngOnInit(): void {
    if(this.users.user() != null){ 
      this.rout.navigate(["/account"])
      return
    }
  }
  on_submit(){
    if(this.sign_up_form.get("password")?.value != this.sign_up_form.get("confirm_password")?.value){
      this.error.set("passwords do not match");
    }else{
      this.error.set(null);
      if(this.sign_up_form.valid){
        this.request.log_in(this.sign_up_form.value).subscribe({
          next:(value) => {
            if(value.seccuss == true){
              this.users.user.set({user_id:value["0"].user_id,user_f_name:value["0"].user_f_name,user_l_name:value["0"].user_l_name,user_email:value["0"].user_email,user_role:value["0"].role,blocked:value["0"].blooked});
              this.rout.navigate(["/"]);
            }else{
              this.error.set(value.message)
            }
          },
        })
      }

    }
  }


}
