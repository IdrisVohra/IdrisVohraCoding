import { Directive, ElementRef, inject, output } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  readonly appClickOutside = output<void>();

  private readonly el = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (target instanceof Node && !this.el.nativeElement.contains(target)) {
      this.appClickOutside.emit();
    }
  }
}
