import { Component, OnInit } from '@angular/core';
import {BlockInterface} from "../../types/block.interface";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  blockCard!: BlockInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
