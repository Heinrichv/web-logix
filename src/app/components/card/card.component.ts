import { Component, OnInit } from '@angular/core';
import { CardComponentModel } from '../../models/cardcomponent';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public card: CardComponentModel;
  constructor() { }

  ngOnInit() {

  }

}
