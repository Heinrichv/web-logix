import { Component, OnInit } from '@angular/core';
import { FieldModels } from 'kentico-cloud-delivery';
import { ContentService } from '../../services/content.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
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
  constructor(private contentService: ContentService) { }

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public matcher = new EmailStateMatcher();
  public image: FieldModels.AssetModel = new FieldModels.AssetModel('', '', 0, '', '');
  public path: string;

  ngOnInit() {
    this.getCopy();
  }

  private getCopy() {
    this.contentService.getContentItems((res) => {
      if (res !== undefined) {
        res.map(item => {
          this.path = window.location.pathname.replace('/', 'copy-');
          let path = window.location.pathname;
          if (path === '/') {
            this.path = 'home';
            path = '/home';
          }
          if (`/${item.system.codename}` === path) {
            this.image = item['headerimage']['assets'][0];
          }
        });
      }
    });
  }
}
