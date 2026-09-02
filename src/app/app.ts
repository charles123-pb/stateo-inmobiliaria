import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomePageComponent } from './pages/home/home-page';

// Componente raiz. Al ser standalone importa directamente el componente de inicio
// y no necesita un AppModule.
@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
  template: '<app-home-page />',
  // OnPush evita revisiones innecesarias; los Signals avisan cuando hay cambios.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
