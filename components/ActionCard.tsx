interface ActionCardProps {
  accion: string
}

export default function ActionCard({ accion }: ActionCardProps) {
  return (
    <div className="mt-6 pt-5 border-t border-border">
      <div className="text-xs uppercase tracking-wider text-text-muted mb-1">
        Acción de retención recomendada
      </div>
      <div className="font-heading font-semibold text-lg text-accent-dark">
        {accion}
      </div>
    </div>
  )
}
