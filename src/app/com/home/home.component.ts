import { Component, OnInit } from '@angular/core';
import {MenuItemInterface} from "../../types/menu-item.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuItems: MenuItemInterface[] = [
    {
      name: 'Hash',
      href: '/hash'
    },
    {
      name: 'Block',
      href: '/block'
    },
    {
      name: 'Blockchain',
      href: '/blockchain'
    },
    {
      name: 'Config',
      href: '/config'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
