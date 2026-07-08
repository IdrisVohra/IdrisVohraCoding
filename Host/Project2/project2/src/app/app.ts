import { Component } from '@angular/core';
import { Dashboard } from './features/dashboard/dashboard';
import { ToastContainer } from './shared/components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [Dashboard, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
