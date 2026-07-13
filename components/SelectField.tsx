interface Option {
  value: string
  label: string
}

interface SelectFieldProps {
  label: string
  name: string
  value: string | number
  options: Option[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectField({ label, name, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs text-text-muted font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="font-body text-sm px-2.5 py-2 border border-border rounded-lg bg-surface text-text focus:outline-2 focus:outline-accent focus:outline-offset-1 focus:bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
