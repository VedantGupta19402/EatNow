export default  function PrimaryButton({
  children, 
  type = 'button',
  className = '',
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3',
        'bg-gradient-to-r from-red-500 to-orange-500',
        'text-white font-semibold tracking-tight',
        'shadow-[0_14px_35px_rgba(239,68,68,0.22)]',
        'hover:from-red-600 hover:to-orange-600 active:from-red-700 active:to-orange-700',
        'transition focus:outline-none focus:ring-4 focus:ring-orange-500/20',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        className,
      ].join(' ')}
    >
      <span>{children}</span>
    </button>
  )
}

