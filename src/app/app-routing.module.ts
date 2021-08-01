import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashComponent } from './com/hash/hash.component';
import { HomeComponent } from './com/home/home.component';
import { PageNotFoundComponent } from './com/page-not-found/page-not-found.component';
import {BlockchainComponent} from "./com/blockchain/blockchain.component";
import {BlockComponent} from "./com/block/block.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'hash',
    component: HashComponent
  },
  {
    path: 'block',
    component: BlockComponent
  },
  {
    path: 'blockchain',
    component: BlockchainComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
