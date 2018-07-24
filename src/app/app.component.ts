import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from './services/content.service';
import { FieldModels } from 'kentico-cloud-delivery';
import {MatSidenav} from '@angular/material/sidenav';
import { MainComponentModel } from './models/maincomponent';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  public image: FieldModels.AssetModel = new FieldModels.AssetModel('', '', 0, '', '');
  public path: string;

  @ViewChild('sidenav') sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

  ngOnInit() {
    this.getCopy();
  }

  private getCopy() {
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
            this.image = item.headerimage.assets[0];
          }
        });
      }
    });
  }

  public onCloseEvent(event: string) {
    this.sidenav.close();
  }
}
