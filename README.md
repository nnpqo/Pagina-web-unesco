# Fake News Validation (Next.js + TypeScript)

Demo simple de una **web** para evaluar la credibilidad de una noticia.
Usa **Next.js 14 (App Router)** y **TypeScript**.

## Requisitos
- Node.js 18+ (recomendado 18/20 LTS)
- npm (o pnpm/yarn)

## Cómo ejecutar
```bash
# 1) Instalar dependencias
npm install
# (o: pnpm install / yarn)

# 2) Levantar en desarrollo
npm run dev

# 3) Abrir en el navegador
http://localhost:3000
```

## Estructura
- `app/` App Router (Next.js 14)
  - `page.tsx`: página principal con formulario y barra de credibilidad
  - `api/evaluate/route.ts`: endpoint de ejemplo (POST) que calcula el puntaje
  - `globals.css`: estilos básicos
- `components/` componentes UI (TrustMeter, Tips)
- `lib/scoring.ts`: regla heurística simple para puntuar la confiabilidad
- `public/`: íconos/archivos estáticos

> Nota: La evaluación es heurística y **no sustituye** verificación profesional.
# Pagina-web-unesco
