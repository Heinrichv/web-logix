import { Component, OnInit } from '@angular/core';
import { MainComponentModel } from '../../models/maincomponent';
import { ContentService } from '../../services/content.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IContactProfileData } from 'kentico-cloud-tracking';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AnimationState } from '../../models/animation';

export class EmailStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  constructor(
    private contentService: ContentService
  ) { }

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public headerImage: string;
  public body: string;
  public footer: string;

  public matcher = new EmailStateMatcher();
  public path: string;
  public contact: IContactProfileData;
  public hasSubscribed = false;

  ngOnInit() {
    this.getCopy();
  }

  private getCopy() {
    this.contentService.getContentItems((res: MainComponentModel[]) => {
      if (res !== undefined) {
        res.map(item => {
          let path = (window as any).location.pathname.replace(`\/${(window as any).location.pathname.split('/')[1]}`, '');
          this.path = path.replace('/', 'copy-');

          if (path === '/') {
            this.path = 'home';
            path = '/home';
          }

          if (`/${item.system.codename}` === path) {
            this.headerImage = item.headerimage.assets[0].url;
            this.body = item.contentbody.value;
            this.footer = item.footer.value;
          }
        });
      }
    });
  }
}
