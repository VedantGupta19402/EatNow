import { useId } from 'react'

export default function InputField({
  label,
  type = 'text',
  name,
  placeholder,
  autoComplete,
  required = false,
  inputMode,
  autoFocus = false,
  rightElement,
  value,
  onChange,
  ...props
}) {
  const reactId = useId()
  const inputId = `${name || 'field'}-${reactId}`
  const hasRight = Boolean(rightElement)

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-900/90">
        {label}
        {required ? <span className="text-orange-500/90"> *</span> : null}
      </label>

      <div className="relative">
        {hasRight ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</div>
        ) : null}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          inputMode={inputMode}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          {...props}
          className={[
            'w-full rounded-xl border bg-white/70 backdrop-blur',
            'border-slate-200/80 hover:border-slate-300/90',
            'px-3 py-3 text-slate-900 placeholder:text-slate-500/80',
            'focus:outline-none focus:ring-4 focus:ring-orange-500/15',
            'transition',
            hasRight ? 'pr-12' : '',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

