import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ClickOutsideDirective],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly isScrolled = signal(false);
  protected readonly isMobileOpen = signal(false);

  protected readonly links = [
    { label: 'Home', path: '/', exactMatch: { exact: true } },
    { label: 'Fleet', path: '/fleet', exactMatch: { exact: false } },
    { label: 'My Trips', path: '/trips', exactMatch: { exact: false } },
    { label: 'About', path: '/about', exactMatch: { exact: false } },
    { label: 'Contact', path: '/contact', exactMatch: { exact: false } },
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 24);
  }

  toggleMobile(event: Event): void {
    event.stopPropagation();
    this.isMobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.isMobileOpen.set(false);
  }
}
