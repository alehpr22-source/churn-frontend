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
      <div className="relative mt-2">
        <div className="h-2.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <div
          className="absolute top-0 w-0.5 h-4 bg-text-muted/50 rounded-full"
          style={{ left: "26.5%" }}
        />
        <span
          className="absolute text-[10px] text-text-muted/70 font-mono leading-none"
          style={{ left: "26.5%", top: "18px" }}
        >
          Promedio 26.5%
        </span>
      </div>
    </div>
  )
}
