# Churn Frontend

Frontend Next.js (App Router, TypeScript, Tailwind v4) para el Sistema de Predicción de Abandono de Clientes mediante Machine Learning y Agente de Utilidad.

Consume la API desplegada en `https://churn-api-alpha-five.vercel.app`.

## Funcionalidad

- **Formulario completo** con 19 campos de cliente de telecomunicaciones agrupados en 4 secciones: Perfil, Contrato y facturación, Servicios contratados, Cargos
- **Campos dependientes** — `PhoneService="No"` deshabilita y auto-asigna Líneas múltiples; `InternetService="No"` deshabilita y auto-asigna 6 servicios de internet
- **Tooltips** con rango del dataset en campos numéricos (tenure, MonthlyCharges, TotalCharges)
- **Validación visual** — advertencia si tenure=0 y TotalCharges>0
- **3 perfiles demo** con un clic: Alto riesgo, Bajo riesgo, Promedio
- **RiskMeter** — probabilidad con badge de color, barra animada y línea de referencia del dataset (26.5%)
- **ActionCard** — acción de retención recomendada destacada
- **ExplanationCard** — frase explicativa en lenguaje natural
- **UtilityTable** — tabla de utilidad esperada por acción, ordenada, con nota de valores ilustrativos
- **Historial** — últimas 4 consultas (colapsable, restaurable con un clic)
- **Botón "Nueva consulta"** — limpia formulario y resultado sin borrar el historial
- **HowItWorks** — sección colapsable que explica XGBoost + Agente de Utilidad con fórmula
- **Cold start detection** — mensaje en la primera carga (backend serverless)
- **Responsive** — layout de 1 columna en mobile, 2 columnas en desktop
- **Footer** con métricas del modelo (Recall 81.6%, ROC-AUC 0.846)
- **Manejo de errores** — error específico para timeout/cold start vs error general

## Tecnologías

- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS v4 con tema personalizado
- Google Fonts: Space Grotesk (headings), Inter (body), IBM Plex Mono (data)

## Enlaces

- **Frontend desplegado:** [churn-prediction-frontend-one.vercel.app](https://churn-prediction-frontend-one.vercel.app)
- **API desplegada:** [churn-api-alpha-five.vercel.app](https://churn-api-alpha-five.vercel.app)
- **API (repositorio):** [github.com/alehpr22-source/churn-prediction](https://github.com/alehpr22-source/churn-prediction)

## Ejecución local

```bash
pnpm install
pnpm dev
```

Crear `.env.local` con `NEXT_PUBLIC_API_URL=https://churn-api-alpha-five.vercel.app`.

## Despliegue

Importar en Vercel (se detecta Next.js automáticamente) y agregar variable de entorno `NEXT_PUBLIC_API_URL`.

**Nota:** La API es serverless; la primera consulta tras inactividad puede demorar unos segundos (cold start).
