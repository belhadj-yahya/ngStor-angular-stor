import { Component, signal } from '@angular/core';
import { User } from '../user_request';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf,NgFor } from '@angular/common';
import { Info_users } from '../user_info';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-and-show-products',
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './add-and-show-products.html',
  styleUrl: './add-and-show-products.css'
})
export class AddAndShowProducts implements OnInit {
  constructor(protected db_request:User,protected user_info:Info_users,private change_page:Router){}
  products = signal<any[]>([]);
  products_index = signal<number |null>(null)
  id_to_change = signal<number | null>(null)
  edit_block_message = false
  add_block_message = false
  added_message = false
  addForm = new FormGroup({
    product_name : new FormControl('',[Validators.required,Validators.maxLength(30)]),
    product_price: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/),Validators.max(1000000),Validators.min(1)]),
    product_units: new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/),Validators.maxLength(3),Validators.max(500),Validators.min(1)]),
    user_id: new FormControl<number | null>(null),
    action: new FormControl("add_item")
  })
  edit_form = new FormGroup({
    new_name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    new_product_price: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/),Validators.max(1000000),Validators.min(1)]),
    new_product_units: new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/),Validators.maxLength(3),Validators.max(500),Validators.min(0)]),
    new_user_id: new FormControl<number | null>(null),
    action: new FormControl("edit_item"),
    item_id : new FormControl<number | null>(null)
  })
  display_edited_item(product_index_to_show:number,id:number){
    this.id_to_change.set(id);
    this.edit_form.get("new_name")?.setValue(this.products()[product_index_to_show].product_name)
    this.edit_form.get("new_product_price")?.setValue(this.products()[product_index_to_show].product_price)
    this.edit_form.get("new_product_units")?.setValue(this.products()[product_index_to_show].product_quantity)
  }
  ngOnInit(): void {
      const uid = this.user_info.user()?.user_id;
      this.addForm.get('user_id')?.setValue(uid ?? null);
      this.edit_form.get('new_user_id')?.setValue(uid ?? null);
    if(this.user_info.user()?.user_id == null){
        this.change_page.navigate(["/login"])
    }else{
      this.db_request.get_items({action:"get_product",id:this.user_info.user()?.user_id}).subscribe({
        next:(response) => {
          this.products.update(arr => response.products)
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }
  add_product(){
    if(this.user_info.user()?.blocked == 'Yes'){
      this.add_block_message = true;
      return;
    }else{
      if(this.addForm.valid){
        this.db_request.add_and_edit_product(this.addForm.value).subscribe({
              next: (response) => {
                this.products.set(response.products);
                this.addForm.reset();
                this.added_message = true;
                setTimeout(() => {
                  this.added_message = false
                },2000);
              },
              error(err) {
                console.log(err)
              },
        })
      }
    }
  }
  edit_item(index:number,product_id:number){
    if(this.user_info.user()?.blocked == 'Yes'){
      this.edit_block_message = true
      return;
    }else{
            this.edit_form.get("item_id")?.setValue(product_id);
            this.db_request.add_and_edit_product(this.edit_form.value).subscribe({
              next:(response) => {
                console.log(response)
                if(this.edit_form.valid){
                    this.products.update(products => {
                    const updatedProducts = [...products];
                    updatedProducts[index] = {
                      ...updatedProducts[index],
                      product_name: this.edit_form.get('new_name')?.value,
                      product_price: this.edit_form.get('new_product_price')?.value,
                      product_quantity: this.edit_form.get('new_product_units')?.value
                    };
                    return updatedProducts;
                });
                }
              },
              error(err) {
                console.log(err)
              },
        })
    }
  }
}
