import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Contenedor visual reutilizable. ng-content permite colocar dentro cualquier
// contenido y variant decide sus colores (light, dark, glass o gradient).
@Component({
  selector: 'app-ui-card',
  template: '<ng-content />',
  styleUrl: './ui-card.scss',
  host: {
    '[class]': "'ui-card ui-card--' + variant()",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {
  // input crea una propiedad que el componente padre puede configurar.
  readonly variant = input<'light' | 'dark' | 'glass' | 'gradient'>('light');
}
