// Los modelos son contratos de TypeScript: describen la forma que deben tener
// los datos. Ayudan durante el desarrollo, pero no crean tablas en Supabase.

// Una tarjeta de servicio de la portada.
export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  cta: string;
  position: number;
}

// Solo se aceptan estas dos presentaciones para una tarjeta de caracteristica.
export type FeatureVariant = 'dashboard' | 'collaboration';

// Una caracteristica mostrada en el bloque bento.
export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  eyebrow: string;
  variant: FeatureVariant;
  position: number;
}

// Un enlace individual que llega desde la tabla footer_links.
export interface FooterLink {
  id: number;
  groupName: string;
  label: string;
  url: string;
  position: number;
}

// Varios enlaces reunidos bajo un titulo, por ejemplo "Products".
export interface FooterGroup {
  name: string;
  links: FooterLink[];
}

// Modelo principal: contiene todo lo que necesita la pagina de inicio.
export interface LandingContent {
  brandName: string;
  brandTagline: string;
  heroPrefix: string;
  heroAccent: string;
  heroSuffix: string;
  heroImageUrl: string;
  sectionBadge: string;
  sectionTitle: string;
  sectionAccent: string;
  sectionDescription: string;
  investmentTitle: string;
  investmentDescription: string;
  investmentButton: string;
  sustainableBadge: string;
  sustainableTitle: string;
  sustainableDescription: string;
  sustainableImageUrl: string;
  communityPrices: string[];
  copyrightText: string;
  services: ServiceItem[];
  features: FeatureItem[];
  footerGroups: FooterGroup[];
}
