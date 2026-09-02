import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { ServiceCardComponent } from '../../shared/service-card/service-card';
import { UiCardComponent } from '../../shared/ui-card/ui-card';

@Component({
  selector: 'app-home-page',
  imports: [ServiceCardComponent, UiCardComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  // inject pide a Angular la unica instancia de ContentService.
  private readonly contentService = inject(ContentService);

  // Expone el Signal para poder leerlo en el HTML mediante content().
  readonly content = this.contentService.content;

  // Si una imagen remota falla, reemplaza su URL por una imagen local segura.
  useFallback(event: Event, fallback: string): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith(fallback)) image.src = fallback;
  }
}
