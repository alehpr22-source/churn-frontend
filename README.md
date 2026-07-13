# Churn Frontend

Frontend Next.js (App Router, TypeScript, Tailwind) para el Sistema de Predicción de Abandono de Clientes mediante Machine Learning y Agente de Utilidad.

Consume la API desplegada en `https://prueba-alpha-five.vercel.app`.

## Funcionalidad

- Formulario con 19 campos de cliente de telecomunicaciones
- Envío a `/api/recomendar` de la API
- Visualización de probabilidad de abandono con medidor de riesgo (Bajo/Medio/Alto)
- Acción de retención recomendada
- Tabla de utilidad esperada por acción

## Tecnologías

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Google Fonts: Space Grotesk, Inter, IBM Plex Mono

## Ejecución local

```bash
pnpm install
pnpm dev
```

Configurar `NEXT_PUBLIC_API_URL` en `.env.local` apuntando a la API.

## Despliegue

Importar en Vercel y agregar variable de entorno `NEXT_PUBLIC_API_URL`.
