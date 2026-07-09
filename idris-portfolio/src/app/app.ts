import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { ThreeBackground } from './three-background';
import { TiltDirective } from './tilt.directive';
import { RevealDirective } from './reveal.directive';
import { EDUCATION, EXPERIENCES, PROFILE, PROJECTS, SKILL_GROUPS } from './resume-data';

@Component({
  selector: 'app-root',
  imports: [ThreeBackground, TiltDirective, RevealDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly profile = PROFILE;
  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly experiences = EXPERIENCES;
  protected readonly projects = PROJECTS;
  protected readonly education = EDUCATION;
  protected readonly year = new Date().getFullYear();

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected scrollTo(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
