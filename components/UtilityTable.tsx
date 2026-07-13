interface UtilityTableProps {
  utilidad_por_accion: Record<string, number>
  accion_recomendada: string
}

export default function UtilityTable({
  utilidad_por_accion,
  accion_recomendada,
}: UtilityTableProps) {
  const entradas = Object.entries(utilidad_por_accion).sort(
    (a, b) => b[1] - a[1]
  )

  return (
    <div className="mt-6 pt-5 border-t border-border">
      <div className="text-xs uppercase tracking-wider text-text-muted mb-3">
        Utilidad esperada por acción
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {entradas.map(([accion, utilidad]) => (
            <tr
              key={accion}
              className={
                accion === accion_recomendada
                  ? "text-accent-dark font-semibold"
                  : "text-text"
              }
            >
              <td className="py-1.5 text-sm border-b border-dashed border-border">
                {accion}
              </td>
              <td className="py-1.5 text-sm text-right font-mono border-b border-dashed border-border">
                {utilidad.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[10px] text-text-muted italic leading-tight">
        * Costos y efectividades de las acciones son valores supuestos con fines
        ilustrativos. Ver Sección 4.1.2 del informe del proyecto.
      </p>
    </div>
  )
}
