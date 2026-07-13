interface FormFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  step?: string
  min?: string
}

export default function FormField({ label, name, value, onChange, step, min }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs text-text-muted font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        required
        className="font-body text-sm px-2.5 py-2 border border-border rounded-lg bg-surface text-text focus:outline-2 focus:outline-accent focus:outline-offset-1 focus:bg-white"
      />
    </div>
  )
}
