import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ServiceItem } from '../../core/models/landing-content.model';
import { UiCardComponent } from '../ui-card/ui-card';

// Componente especializado que presenta un solo servicio.
@Component({
  selector: 'app-service-card',
  imports: [UiCardComponent],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  // required obliga al padre a enviar un ServiceItem con [service]="service".
  readonly service = input.required<ServiceItem>();
}
