interface RiskMeterProps {
  probabilidad: number
}

function colorSegunRiesgo(p: number): string {
  if (p < 0.33) return "#2E933C"
  if (p < 0.66) return "#E4A62E"
  return "#E4572E"
}

function etiquetaRiesgo(p: number): string {
  if (p < 0.33) return "Bajo"
  if (p < 0.66) return "Medio"
  return "Alto"
}

export default function RiskMeter({ probabilidad }: RiskMeterProps) {
  const pct = (probabilidad * 100).toFixed(1)
  const color = colorSegunRiesgo(probabilidad)

  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-muted mb-1">
        Probabilidad de abandono
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-3xl font-medium text-primary">
          {pct}%
        </span>
        <span
          className="font-heading text-sm font-semibold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {etiquetaRiesgo(probabilidad)}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-border overflow-hidden mt-2">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
