export default function AuthCard({ children, className = '' }) {
  return (
    <section
      className={[
        'relative w-full rounded-3xl border border-white/70 bg-white/65 backdrop-blur-xl',
        'shadow-[0_12px_40px_rgba(2,6,23,0.10)]',
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}

