import { Component, OnInit, Input } from '@angular/core';
import { CardComponentModel } from '../../models/cardcomponent';
import { AnimationState } from '../../models/animation';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: CardComponentModel;

  public title: string;
  public header: string;
  public image: string;
  public body: string;
  public button: string;

  constructor() { }

  ngOnInit() {
    if (this.card !== undefined) {
      this.title = this.card.title.value;
      this.header = this.card.header.value;
      this.image = this.card.image.assets[0].url;
      this.body = this.card.body.value;
      this.button = this.card.redirect.value;
    }
  }
}
