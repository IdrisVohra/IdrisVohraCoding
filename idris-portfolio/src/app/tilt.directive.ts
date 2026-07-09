import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

/** Adds a 3D perspective tilt to a card as the cursor moves over it. */
@Directive({
  selector: '[appTilt]',
})
export class TiltDirective implements OnInit, OnDestroy {
  private readonly el: HTMLElement;

  private readonly onMove = (e: MouseEvent) => {
    const rect = this.el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    this.el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(12px)`;
  };

  private readonly onLeave = () => {
    this.el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  constructor(ref: ElementRef<HTMLElement>, private readonly zone: NgZone) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.style.transition = 'transform 0.18s ease-out';
    this.el.style.willChange = 'transform';
    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('mousemove', this.onMove, { passive: true });
      this.el.addEventListener('mouseleave', this.onLeave, { passive: true });
    });
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('mousemove', this.onMove);
    this.el.removeEventListener('mouseleave', this.onLeave);
  }
}
