import { Injectable } from '@angular/core';
import { DeliveryClient, TypeResolver, SortOrder } from 'kentico-cloud-delivery';
import { MainComponentModel } from '../models/maincomponent';
import { CardComponentModel } from '../models/cardcomponent';

@Injectable({
  providedIn: 'root'
})

export class ContentService {
  constructor() {}

  private deliveryClient = new DeliveryClient({
    projectId: '4f8c5933-9460-004e-95bd-0ac95db4ec8f',
    typeResolvers: [
      new TypeResolver('MainComponent', () => new MainComponentModel()),
      new TypeResolver('MainComponent', () => new CardComponentModel())
    ]
  });

  public getContentItems(callback): MainComponentModel[] {
    console.log('Attemting to get content from local storage');
    const currentDate = new Date(new Date().toUTCString());
    const cacheObject = JSON.parse(window.localStorage.getItem('MainComponent'));
    if (cacheObject === null || cacheObject === undefined) {
      this.getMainComponentsFromService((res: MainComponentModel[]) => {
        return callback(res);
      });
    } else {
      if (currentDate < new Date(cacheObject.expires)) {
        console.log('Content not expired using cached content');
        return callback(cacheObject.components as MainComponentModel[]);
      } else {
        console.log('Content expired getting from service');
        this.getMainComponentsFromService((res: MainComponentModel[]) => {
          return callback(res);
        });
      }
    }
  }

  public getCardComponentsItems(callback): CardComponentModel[] {
    console.log('Attemting to get content from local storage');
    const currentDate = new Date(new Date().toUTCString());
    const cacheObject = JSON.parse(window.localStorage.getItem('CardComponent'));
    if (cacheObject === null || cacheObject === undefined) {
      this.getCardComponentsFromService((res: CardComponentModel[]) => {
        return callback(res);
      });
    } else {
      if (currentDate < new Date(cacheObject.expires)) {
        console.log('Content not expired using cached content');
        return callback(cacheObject.components as CardComponentModel[]);
      } else {
        console.log('Content expired getting from service');
        this.getCardComponentsFromService((res: CardComponentModel[]) => {
          return callback(res);
        });
      }
    }
  }

  private getMainComponentsFromService(callback) {
    this.deliveryClient.items<MainComponentModel>()
      .type('maincomponent')
      .getObservable()
      .subscribe(res => {
        const expireDate = new Date(new Date().toUTCString());
        expireDate.setMinutes(expireDate.getMinutes() + 10);
        window.localStorage.setItem('MainComponent', JSON.stringify({
          components: res.items as MainComponentModel[],
          expires: expireDate.toString()
        }));
        return callback(res.items);
      });
  }

  private getCardComponentsFromService(callback) {
    this.deliveryClient.items<CardComponentModel>()
      .type('cardcomponent')
      .getObservable()
      .subscribe(res => {
        const expireDate = new Date(new Date().toUTCString());
        expireDate.setMinutes(expireDate.getMinutes() + 10);
        window.localStorage.setItem('CardComponent', JSON.stringify({
          components: res.items as CardComponentModel[],
          expires: expireDate.toString()
        }));
        return callback(res.items);
      });
  }
}
