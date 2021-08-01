import { Component } from '@angular/core';

interface MenuItemInterface {
  name: string,
  href: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blockchain demo';
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
    }
  ]

}
