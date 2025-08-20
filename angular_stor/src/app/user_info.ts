import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

interface user{
    user_id:number;
    user_f_name:string;
    user_l_name:string;
    user_email:string;
    user_role:string;
    blocked:string;
    
}
@Injectable({
    providedIn: "root"
})
export class Info_users{
    constructor(private rout:Router){}
    user = signal<user | null>(null)
    remove_user(){
        this.user.set(null)
        this.rout.navigate(["/"])
    }
}