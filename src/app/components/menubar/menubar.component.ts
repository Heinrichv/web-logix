import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { MainComponentModel } from '../../models/maincomponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  public headerText: any = '';
  public menuItems: any[] = [];
  public assetLogo: string;
  @Output() closeEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.build();
  }

  private build() {
    let path = (window as any).location.pathname.replace(`\/${(window as any).location.pathname.split('/')[1]}`, '');

    if (path === '/') {
      path = '/home';
    }

    this.contentService.getContentItems((res: MainComponentModel[]) => {
      if (res !== undefined) {
        res.map(element => {
          console.log(path, `/${element.system.codename}`);
          this.menuItems.push({
            'text': element.system.name,
            'link': element.system.codename,
            'active': path === `/${element.system.codename}`
          });
        });
      }
    });
  }

  public navigate(path) {
    this.closeMenu();
    this.router.navigate([path]);
  }

  public closeMenu() {
    this.closeEvent.emit('close');
  }
}
