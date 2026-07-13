interface FormFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  step?: string
  min?: string
  tooltip?: string
}

export default function FormField({ label, name, value, onChange, step, min, tooltip }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs text-text-muted font-medium inline-flex items-center gap-1">
        {label}
        {tooltip && (
          <span
            className="relative group cursor-help"
            title={tooltip}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-text-muted/60"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM9.75 8.25a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5Zm.75-2.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-800 text-white text-[11px] rounded whitespace-nowrap z-10 shadow-lg pointer-events-none">
              {tooltip}
            </span>
          </span>
        )}
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
