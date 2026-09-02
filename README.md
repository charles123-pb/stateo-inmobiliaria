# Estateo — Angular + Supabase

Landing inmobiliaria académica desarrollada con Angular 21 y Supabase. No tiene panel administrador: el contenido se modifica directamente desde las tablas de Supabase y la página se actualiza automáticamente mediante Realtime.

## Tecnologías

- Angular 21 con componentes standalone y Signals.
- SCSS con variables globales de tema.
- Supabase (PostgreSQL + Realtime).
- Componentes reutilizables para tarjetas y servicios.

## 1. Preparar Supabase

1. Crea un proyecto en <https://supabase.com>.
2. Abre `SQL Editor` y selecciona `New query`.
3. Copia todo el contenido de `supabase/schema.sql`.
4. Presiona `Run` una sola vez.
5. Ve a `Project Settings > API`.
6. Copia `Project URL` y la clave `anon public`.

## 2. Conectar Angular

Abre `src/environments/environment.ts` y reemplaza:

```ts
supabaseUrl: 'PEGA_AQUI_TU_PROJECT_URL',
supabaseAnonKey: 'PEGA_AQUI_TU_ANON_PUBLIC_KEY',
```

La clave `anon public` es pública y está diseñada para el frontend. Nunca coloques la clave `service_role` en Angular.

## 3. Ejecutar el proyecto

```bash
npm install
npm start
```

Abre <http://localhost:4200>.

## 4. Demostrar la base de datos en clase

1. Mantén la página abierta.
2. En Supabase abre `Table Editor`.
3. Entra a `site_settings` y cambia `hero_prefix`, `hero_accent` o `section_title`.
4. Guarda la fila.
5. La página mostrará el nuevo texto automáticamente.

También puedes cambiar:

- `services`: las tres tarjetas sobre la imagen principal.
- `feature_cards`: las tarjetas del bloque central.
- `footer_links`: enlaces y grupos del pie de página.
- `hero_image_url` y `sustainable_image_url`: imagen local o URL pública.

## Estructura reutilizable

- `core/models`: contratos de datos.
- `core/data`: contenido de respaldo antes de conectar Supabase.
- `core/services`: lectura y escucha Realtime.
- `shared/ui-card`: tarjeta base con variantes de tema.
- `shared/service-card`: tarjeta de servicio reutilizada con `@for`.
- `pages/home`: composición completa del landing.

## Compilar para entrega

```bash
npm run build
```

La versión final se genera en `dist/estateo-angular/browser`.
