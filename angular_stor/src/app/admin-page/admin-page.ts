import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Info_users } from '../user_info';

@Component({
  selector: 'app-admin-page',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css'
}) 
export class AdminPage {
  constructor(protected users:Info_users){}

}
