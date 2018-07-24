import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export class AnimationState {
  constructor(public animationState = 'inactive') {}

  public animationExport = [
    trigger('animationState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ];

  toggleState() {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }
}
