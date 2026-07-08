import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Hamdan Car Rental — Rent the car of your dreams',
  },
  {
    path: 'fleet',
    loadComponent: () => import('./features/fleet/fleet').then((m) => m.Fleet),
    title: 'Our Fleet — Hamdan Car Rental',
  },
  {
    path: 'trips',
    loadComponent: () => import('./features/trips/trips').then((m) => m.Trips),
    title: 'My Trips — Hamdan Car Rental',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    title: 'About Us — Hamdan Car Rental',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'Contact Us — Hamdan Car Rental',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    title: 'Page Not Found — Hamdan Car Rental',
  },
];
