import { Routes } from '@angular/router';
import { Cart } from './cart/cart';
import { ListProduct } from './list-product/list-product';
import { Account } from './account/account';
import { Login } from './login/login';
import { AddAndShowProducts } from './add-and-show-products/add-and-show-products';
import { ShowOrders } from './show-orders/show-orders';
import { AdminPage } from './admin-page/admin-page';
import { AdminMain } from './admin-main/admin-main';
import { AdminOrders } from './admin-orders/admin-orders';
import { Signup } from './signup/signup';

export const routes: Routes = [
    {path:"cart",component:Cart},
    {path:"",component:ListProduct},
    {
        path:"account",
        component:Account,
        children:[
            { path: "", redirectTo: "my-products", pathMatch: "full" },
            {path:"my-products",component:AddAndShowProducts},
            {path:"my-orders",component:ShowOrders}
        ]
    },
    {path:"login",component:Login},
    {path:"sign up",component:Signup},
    {path:"admin",component:AdminPage,
        children:[
            {path:"", redirectTo:"main", pathMatch:"full"},
            {path:"main",component:AdminMain},
            {path:"orders",component:AdminOrders},
        ]
    }
];
