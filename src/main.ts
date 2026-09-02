import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Punto de entrada de Angular: crea el componente raiz App dentro de <app-root>.
// appConfig contiene los proveedores globales utilizados por la aplicacion.
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
