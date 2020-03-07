import { Directive, HostListener } from '@angular/core';

import { MenuComponent } from '../../components';

@Directive({
  selector: '[loginTimeout]'
})
export class LoginTimeoutDirective {
  time = 54000000;

  constructor(
    private menuComponent: MenuComponent
  ) {
    let interval = setInterval(() => {
      this.time = this.time - 1000;

      if (this.time === 0) {
        clearInterval(interval);

        this.menuComponent.logout();
      }
    }, 1000);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.time = 54000000;
  }

}
