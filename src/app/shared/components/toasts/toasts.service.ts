import {ComponentRef, Injectable} from '@angular/core';
import {Overlay, OverlayConfig, OverlayContainer, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ToastsComponent} from './toasts.component';
import {maxToasts, POSITION_TOAST, timeOutToast} from '../../constants';

interface Toast {
  overlayRef: OverlayRef,
  componentRef: ComponentRef<any>,
  count: number
};

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  private readonly timeAnimate = 500;
  private toasts: Toast[] = [];
  private count = 0;

  constructor(private readonly overlay: Overlay,
              private readonly overlayContainer: OverlayContainer) {
  }

  public show(
    message: string,
    type: 'my-info' | 'my-success' | 'my-warning' | 'my-fail',
    iconPath: string) {

    const overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayContainer.getContainerElement().classList.add('my-overlay-container');//cdk-overlay-container
    this.overlayContainer.getContainerElement().classList.add(POSITION_TOAST);
    overlayRef.overlayElement.parentElement?.classList?.add('my-global-overlay-wrapper');
    overlayRef.overlayElement.classList.add('my-overlay-pane');//overlay-pane

    const componentPortal = new ComponentPortal(ToastsComponent);

    const componentRef = overlayRef.attach(componentPortal);
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    componentRef.instance.iconPath = iconPath;
    componentRef.instance.count = this.count;
    componentRef.instance.show = 'open';

    const toast = {overlayRef, componentRef, count: this.count};

    this.toasts.push(toast);

    if (this.toasts.length > maxToasts) {
      const delNumber = this.toasts.length - maxToasts;

      for (let i = 0; i < delNumber; i++) {
        this.toasts[i].componentRef.instance.show = 'close';
        this.toasts = this.toasts.filter((t: Toast) => t.count !== this.toasts[i].count);
      }

    }

    setTimeout(() => {
      if (toast.componentRef) {
        toast.componentRef.instance.show = 'close';
      }
    }, timeOutToast - this.timeAnimate);

    setTimeout(() => {
      if (toast.overlayRef) {
        this.removeToast(toast);
        this.toasts = this.toasts
          .filter((t: Toast) => t.count !== toast.count);
      }
    }, timeOutToast);

    this.count++;
  }

  public closeToast(toast: any): void {
    toast.show = 'close';

    setTimeout(() => {
      const index = this.toasts
        .findIndex((t: Toast) => t.count === toast.count);
      this.removeToast(this.toasts[index]);
      this.toasts = this.toasts
        .filter((t: Toast) => t.count !== toast.count);
    }, this.timeAnimate - 200);
  }

  private removeToast(toast: Toast): void {
    toast.overlayRef.dispose();
    toast.componentRef.destroy();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global();

    return new OverlayConfig({
      hasBackdrop: false,
      positionStrategy,
    });
  }

}
