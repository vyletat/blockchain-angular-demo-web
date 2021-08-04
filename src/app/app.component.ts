import { Component } from '@angular/core';
import {MenuItemInterface} from "./types/menu-item.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blockchain demo';
  today = Date.now();
  // Array with m,enu items hrefs
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

}
