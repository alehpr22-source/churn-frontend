interface ExplanationCardProps {
  probabilidad: number
  accion: string
  cargoMensual: number
}

export default function ExplanationCard({
  probabilidad,
  accion,
  cargoMensual,
}: ExplanationCardProps) {
  const pct = (probabilidad * 100).toFixed(1)

  const nivelRiesgo =
    probabilidad < 0.33 ? "baja" : probabilidad < 0.66 ? "media" : "alta"

  const explicacion =
    `Este cliente presenta una probabilidad ${nivelRiesgo} de abandono (${pct}%)` +
    (cargoMensual > 80
      ? ` y un cargo mensual elevado ($${cargoMensual.toFixed(2)}).`
      : ` y un cargo mensual de $${cargoMensual.toFixed(2)}.`) +
    ` ${accion} maximiza la utilidad esperada considerando el perfil del cliente.`

  return (
    <div className="mt-4 p-4 bg-surface rounded-lg border border-border text-sm leading-relaxed text-text">
      <p>{explicacion}</p>
    </div>
  )
}
