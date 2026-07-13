export default function HowItWorks() {
  return (
    <details className="mt-5 pt-4 border-t border-border group">
      <summary className="text-xs text-text-muted font-medium cursor-pointer hover:text-text transition-colors">
        ¿Cómo funciona?
      </summary>
      <div className="mt-3 text-xs text-text-muted leading-relaxed space-y-2">
        <p>
          <strong>1. Predicción:</strong> Un modelo XGBoost (entrenado con 7,043
          clientes de telecomunicaciones) estima la probabilidad de abandono del
          cliente basándose en 19 variables (demográficas, servicios contratados
          y datos de cuenta).
        </p>
        <p>
          <strong>2. Recomendación:</strong> Un Agente de Utilidad evalúa 4
          acciones de retención — Sin acción, Descuento en la tarifa (20%),
          Mejora de plan sin costo adicional, Contacto proactivo — y selecciona
          la que maximiza la utilidad esperada:
        </p>
        <p className="font-mono text-[11px] bg-surface p-2 rounded">
          U(acción) = p_churn × efectividad(acción) × valor_cliente −
          costo(acción)
        </p>
        <p>
          Ver informe completo en el{" "}
          <a
            href="https://github.com/alehpr22-source/churn-prediction"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            repositorio del proyecto
          </a>
          .
        </p>
      </div>
    </details>
  )
}
