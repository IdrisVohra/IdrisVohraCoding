import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly year = new Date().getFullYear();

  protected readonly quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Fleet', path: '/fleet' },
    { label: 'My Trips', path: '/trips' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  protected readonly socials = [
    { icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { icon: 'fa-brands fa-x-twitter', label: 'Twitter' },
    { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  ];
}
