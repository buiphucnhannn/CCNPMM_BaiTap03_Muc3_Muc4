import { useState } from 'react';

export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  maxLength,
  required = false,
  disabled = false,
  rightElement = null,
}) {
  const [inputId] = useState(() => `${name}-${Math.random().toString(36).slice(2, 9)}`);

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${rightElement ? 'pr-11' : ''} ${error ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-300 focus:ring-sky-200'}`}
        />
        {rightElement ? <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</div> : null}
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </label>
  );
}

