import { Injectable, OnDestroy, signal } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { DEFAULT_CONTENT } from '../data/default-content';
import {
  FeatureItem,
  FooterGroup,
  FooterLink,
  LandingContent,
  ServiceItem,
} from '../models/landing-content.model';

// Una fila generica recibida desde Supabase antes de convertir sus propiedades.
type Row = Record<string, unknown>;

// providedIn: 'root' hace que Angular cree una unica instancia para toda la app.
@Injectable({ providedIn: 'root' })
export class ContentService implements OnDestroy {
  // El cliente realiza consultas; el canal mantiene la conexion Realtime.
  private client?: SupabaseClient;
  private channel?: RealtimeChannel;

  // content es una variable reactiva observada por la plantilla.
  // Comienza con datos locales para que la interfaz nunca aparezca vacia.
  readonly content = signal<LandingContent>(DEFAULT_CONTENT);
  readonly loading = signal(false);
  readonly connected = signal(false);

  constructor() {
    // Solo intenta conectarse si environment.ts contiene credenciales reales.
    if (this.hasValidCredentials()) {
      this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

      // Hace la primera carga y luego queda escuchando futuros cambios.
      // void indica que no necesitamos detener el constructor hasta que termine.
      void this.loadContent();
      this.subscribeToChanges();
    }
  }

  // Evita crear un cliente cuando todavia quedan valores de ejemplo sin reemplazar.
  private hasValidCredentials(): boolean {
    return (
      environment.supabaseUrl.startsWith('https://') &&
      !environment.supabaseUrl.includes('PEGA_AQUI') &&
      environment.supabaseAnonKey.length > 40 &&
      !environment.supabaseAnonKey.includes('PEGA_AQUI')
    );
  }

  async loadContent(): Promise<void> {
    if (!this.client) return;
    this.loading.set(true);

    // Las cuatro consultas se ejecutan en paralelo para reducir el tiempo de espera.
    // site_settings tiene una unica fila (id = 1); las listas se ordenan para
    // conservar el orden visual definido en la base de datos.
    const [settingsResult, servicesResult, featuresResult, footerResult] = await Promise.all([
      this.client.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      this.client.from('services').select('*').order('position'),
      this.client.from('feature_cards').select('*').order('position'),
      this.client.from('footer_links').select('*').order('id'),
    ]);

    const hasError = [settingsResult, servicesResult, featuresResult, footerResult].some(
      (result) => result.error,
    );

    // Solo reemplaza el contenido de respaldo cuando todas las consultas funcionaron.
    if (!hasError && settingsResult.data) {
      this.content.set({
        // Convierte la fila de configuracion y agrega las tres listas relacionadas.
        ...this.mapSettings(settingsResult.data as Row),
        services: (servicesResult.data as Row[]).map((row) => this.mapService(row)),
        features: (featuresResult.data as Row[]).map((row) => this.mapFeature(row)),
        footerGroups: this.groupFooterLinks(
          (footerResult.data as Row[]).map((row) => this.mapFooter(row)),
        ),
      });
      this.connected.set(true);
    }

    this.loading.set(false);
  }

  private subscribeToChanges(): void {
    if (!this.client) return;

    // El canal recibe eventos INSERT, UPDATE o DELETE de las tablas publicadas
    // en Supabase Realtime. Ante cualquier cambio, vuelve a cargar el contenido.
    this.channel = this.client.channel('estateo-live-content');
    for (const table of ['site_settings', 'services', 'feature_cards', 'footer_links']) {
      this.channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => void this.loadContent(),
      );
    }
    this.channel.subscribe();
  }

  // La base de datos usa snake_case (hero_prefix), mientras TypeScript usa
  // camelCase (heroPrefix). Estos metodos hacen esa conversion y aseguran tipos.
  private mapSettings(row: Row): Omit<LandingContent, 'services' | 'features' | 'footerGroups'> {
    return {
      brandName: String(row['brand_name']),
      brandTagline: String(row['brand_tagline']),
      heroPrefix: String(row['hero_prefix']),
      heroAccent: String(row['hero_accent']),
      heroSuffix: String(row['hero_suffix']),
      heroImageUrl: String(row['hero_image_url']),
      sectionBadge: String(row['section_badge']),
      sectionTitle: String(row['section_title']),
      sectionAccent: String(row['section_accent']),
      sectionDescription: String(row['section_description']),
      investmentTitle: String(row['investment_title']),
      investmentDescription: String(row['investment_description']),
      investmentButton: String(row['investment_button']),
      sustainableBadge: String(row['sustainable_badge']),
      sustainableTitle: String(row['sustainable_title']),
      sustainableDescription: String(row['sustainable_description']),
      sustainableImageUrl: String(row['sustainable_image_url']),
      communityPrices: Array.isArray(row['community_prices'])
        ? (row['community_prices'] as unknown[]).map(String)
        : DEFAULT_CONTENT.communityPrices,
      copyrightText: String(row['copyright_text']),
    };
  }

  private mapService(row: Row): ServiceItem {
    return {
      id: Number(row['id']),
      title: String(row['title']),
      description: String(row['description']),
      cta: String(row['cta']),
      position: Number(row['position']),
    };
  }

  private mapFeature(row: Row): FeatureItem {
    return {
      id: Number(row['id']),
      title: String(row['title']),
      description: String(row['description']),
      eyebrow: String(row['eyebrow']),
      variant: row['variant'] === 'collaboration' ? 'collaboration' : 'dashboard',
      position: Number(row['position']),
    };
  }

  private mapFooter(row: Row): FooterLink {
    return {
      id: Number(row['id']),
      groupName: String(row['group_name']),
      label: String(row['label']),
      url: String(row['url']),
      position: Number(row['position']),
    };
  }

  private groupFooterLinks(links: FooterLink[]): FooterGroup[] {
    // Map agrupa los enlaces que tienen el mismo groupName.
    const groups = new Map<string, FooterLink[]>();
    for (const link of links) {
      groups.set(link.groupName, [...(groups.get(link.groupName) ?? []), link]);
    }
    return [...groups.entries()].map(([name, groupLinks]) => ({ name, links: groupLinks }));
  }

  ngOnDestroy(): void {
    // Cierra el canal cuando el servicio se destruye para no dejar conexiones abiertas.
    if (this.channel && this.client) void this.client.removeChannel(this.channel);
  }
}
