import { Component, OnInit, Inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { MainComponentModel } from '../../models/maincomponent';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})

export class CopyComponent implements OnInit {
  constructor(
    private contentService: ContentService
  ) { }

  public body: string;
  public footer: string;
  public path: string;
  public isLoading = true;

  ngOnInit() {
    this.getSiteContent();
  }

  private getSiteContent() {
    this.contentService.getContentItems((res: MainComponentModel[]) => {
      if (res !== undefined) {
        res.map(item => {
          this.path = window.location.pathname.replace('/', 'copy-');
          let path = (window as any).location.pathname.replace(`\/${(window as any).location.pathname.split('/')[1]}`, '');

          if (path === '/') {
            this.path = 'home';
            path = '/home';
          }

          if (`/${item.system.codename}` === path) {
            this.body = item.contentbody.value;
            this.footer =  item.footer.value;
            this.isLoading = false;
          }
        });
      }
    });
  }
}

