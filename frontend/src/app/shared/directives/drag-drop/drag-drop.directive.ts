import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[dragDrop]'
})
export class DragDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') background = '#F1F1F1';
  @HostBinding('style.opacity') opacity = '1';

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.background = '#9ECBEC';
    this.opacity = '0.8';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.background = '#F1F1F1';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.background = '#F1F1F1';
    this.opacity = '1';

    let files = evt.dataTransfer.files;

    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

}
