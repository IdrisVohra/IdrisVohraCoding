import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

/** Fades and slides an element up when it scrolls into the viewport. */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private readonly ref: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.ref.nativeElement;
    el.classList.add('reveal');
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('revealed');
            this.observer?.unobserve(el);
          }
        }
      },
      { threshold: 0.12 },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
