import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastsService} from './toasts.service';
import {CommonModule} from '@angular/common';
import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';
import {provideAnimations} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    provideAnimations(),
  ],
  animations: [
    trigger('animations', [
      state('open', style({
        opacity: 1,
      })),
      transition('* => open', [
        style({
          opacity: 0,
          transform: 'translateY(140px)',
        }),
        animate('0.5s ease-in-out'),
      ]),

      state('up', style({
        transform: 'translateY(-70px)',
      })),
      transition('* => up', [
        animate('0.5s ease-in-out'),
      ]),

      state('close', style({
        transform: 'translateY(-140px)',
        'margin-bottom': '-70px',
        opacity: 0,
        display: 'none'
      })),
      transition('* => close', [
        animate('0.5s'),
      ]),
    ]),
  ],
})

export class ToastsComponent {
  @Input() message: string = '';
  @Input() show = '';
  @Input() iconPath = '';
  @Input() count = 0;
  @Input() type: 'my-info' | 'my-success' | 'my-warning' | 'my-fail' = 'my-info';

  constructor(private myToastService: ToastsService) {
  }

  close(): void {
    this.myToastService.closeToast(this);
  }

}
