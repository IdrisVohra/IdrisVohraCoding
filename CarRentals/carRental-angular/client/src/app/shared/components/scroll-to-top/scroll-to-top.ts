import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  template: `
    <button
      type="button"
      class="scroll-top"
      [class.scroll-top--visible]="visible()"
      (click)="scrollToTop()"
      aria-label="Scroll to top"
    >
      <i class="fa-solid fa-angle-up"></i>
    </button>
  `,
  styleUrl: './scroll-to-top.scss',
})
export class ScrollToTop {
  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 600);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
