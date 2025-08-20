import { Component } from '@angular/core';
import {RouterLink,RouterOutlet } from '@angular/router';
import { CartAndPurshes } from '../cart_and_purshes';
import { Info_users } from '../user_info';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(protected cart:CartAndPurshes,protected users:Info_users){}
}
