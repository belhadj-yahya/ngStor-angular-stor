
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // to send http request
import { Observable } from 'rxjs';
//here we are saying that this service can be injected into any component or other services so its reusble
@Injectable({
  providedIn: 'root'  // Automatically provided in root injector aka create this instince for the whole app
})
export class ProductService {
  private apiUrl = 'http://localhost/backend_php/api/product.php';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  buyProducts(data:any): Observable<any>{
    return this.http.post<any>(this.apiUrl,data);
  }
}