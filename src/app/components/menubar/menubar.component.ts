import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(
    private contentService: ContentService
  ) { }
  public headerText: any = '';
  public menuItems: any[] = [];
  public assetLogo: string;

  ngOnInit() {
    this.build();
  }

  private build() {
    let path = window.location.pathname;
    if (path === '/') {
      path = '/home';
    }

    this.contentService.getContentItems((res) => {
      if (res !== undefined) {
        res.map(element => {
          this.menuItems.push({
            'text': element.system.name,
            'link': element.system.codename,
            'active': path === `/${element.system.codename}`
          });
        });
      }
    });
  }
}
