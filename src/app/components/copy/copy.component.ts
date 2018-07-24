import {
  Component,
  OnInit
} from '@angular/core';

import {
  ContentService
} from '../../services/content.service';

import {
  MainComponentModel
} from '../../models/maincomponent';

import {
  CardComponentModel
} from '../../models/cardcomponent';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { AnimationState } from '../../models/animation';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})

export class CopyComponent implements OnInit {
  constructor(
    private contentService: ContentService
  ) {}

  public headerImage: string;
  public body: string;
  public footer: string;
  public path: string;
  public isLoading = true;
  public showCards = false;
  public cardComponents: CardComponentModel[];

  ngOnInit() {
    this.cardComponents = null;
    this.getSiteContent();
  }

  private getSiteContent() {
    this.contentService.getContentItems((mainRes: MainComponentModel[]) => {
      if (mainRes !== undefined) {
        mainRes.map(item => {
          this.path = window.location.pathname.replace('/', 'copy-');
          let path = (window as any).location.pathname.replace(`\/${(window as any).location.pathname.split('/')[1]}`, '');

          if (path === '/') {
            this.path = 'home';
            path = '/home';
          }

          if (`/${item.system.codename}` === path) {
            this.headerImage = item.headerimage.assets[0].url;
            this.body = item.contentbody.value;
            this.footer = item.footer.value;
            this.isLoading = false;
          }

          if ('/services' === path) {
            this.contentService.getCardComponentsItems((cardRes: CardComponentModel[]) => {
              if (cardRes !== undefined) {
                this.showCards = true;
                this.cardComponents = cardRes;
              } else {
                this.showCards = false;
              }
            });
          }
        });
      }
    });
  }
}
