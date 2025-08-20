import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class User{
private apiUrl = 'http://localhost/backend_php/api/user.php';

// user = signal<user | null>(null);

    constructor(protected http:HttpClient){}
    log_in(data:any): Observable <any>{
        return this.http.post(this.apiUrl,data);
    }
    get_orders(api:string):Observable<any>{
        return this.http.get(api);
    }
    get_items(action_and_id:object):Observable<any>{
        return this.http.post(this.apiUrl,action_and_id);
    }
    add_and_edit_product(data:object):Observable<any>{
        return this.http.post(this.apiUrl,data);
    }

}