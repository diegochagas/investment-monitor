import { Directive, HostListener } from '@angular/core';

import { ViewStrategyService } from '../../services';

@Directive({
  selector: '[scrollDirective]'
})
export class ScrollDirective {

  constructor(
    private viewStrategyService: ViewStrategyService
  ) { }

  @HostListener("scroll", ["$event"])
  onScroll(event) {
    this.viewStrategyService.positionTopChangeValue(event.target.scrollTop);
  }

}
