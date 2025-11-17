import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { LucideAngularModule, Home, Users, Settings, Car } from 'lucide-angular';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
  ]
});
