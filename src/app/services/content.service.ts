import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentItem,  DeliveryClient,  ItemResponses } from 'kentico-cloud-delivery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContentService {
  constructor() {}

  private deliveryClient = new DeliveryClient({
    projectId: '4f8c5933-9460-004e-95bd-0ac95db4ec8f'
  });

  public getContentItems(callback): ContentItem[] {
    console.log('Attemting to get content from local storage');
    const currentDate = new Date(new Date().toUTCString());
    const cacheObject = JSON.parse(window.localStorage.getItem('content'));
    if (cacheObject === null || cacheObject === undefined) {
      this.getContentFromService((res) => {
        return callback(res);
      });
    } else {
      if (currentDate < new Date(cacheObject.expires)) {
        console.log('Content not expired using cached content');
        return callback(cacheObject.contentItems);
      } else {
        console.log('Content expired getting from service');
        this.getContentFromService((res) => {
          return callback(res);
        });
      }
    }
  }

  private getContentFromService(callback) {
    this.deliveryClient.items().getObservable().subscribe(res => {
      const expireDate = new Date(new Date().toUTCString());
      expireDate.setMinutes(expireDate.getMinutes() + 10);
      window.localStorage.setItem('content', JSON.stringify({
        contentItems: res.items,
        expires: expireDate.toString()
      }));
      return callback(res.items);
    });
  }
}
