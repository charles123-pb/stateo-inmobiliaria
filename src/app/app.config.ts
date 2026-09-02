import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Configuracion global que se entrega a bootstrapApplication en main.ts.
export const appConfig: ApplicationConfig = {
  // Permite que Angular capture y reporte errores globales del navegador.
  providers: [provideBrowserGlobalErrorListeners()],
};
