function BrandMark({ variant }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div
        className={[
          'h-11 w-11 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm flex items-center justify-center',
          variant === 'partner' ? 'text-orange-500' : 'text-red-500',
        ].join(' ')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 12c0 3.866 3.134 7 7 7s7-3.134 7-7-3.134-7-7-7-7 3.134-7 7Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900/90 tracking-wide">EatNow</div>
        <div className="text-xs text-slate-600">{variant === 'partner' ? 'Restaurant' : 'Customer'}</div>
      </div>
    </div>
  )
}

function BrandIllustration({ variant }) {
  const start = variant === 'partner' ? '#f97316' : '#ef4444'
  const end = '#f59e0b'
  return (
    <div className="relative mt-6">
      <div className="absolute -inset-10 bg-gradient-to-tr from-orange-500/20 via-red-500/15 to-amber-500/20 blur-2xl rounded-[3rem]" />
      <div className="relative">
        <svg viewBox="0 0 520 360" className="w-full max-w-md mx-auto" role="img" aria-label="Food-tech illustration">
          <defs>
            <linearGradient id={`g-${variant}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={start} stopOpacity="0.95" />
              <stop offset="100%" stopColor={end} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M74 260c42-70 94-104 156-102 56 2 92 30 126 63 27 26 52 48 92 44 43-4 57-33 62-62v104c0 18-14 32-32 32H106c-18 0-32-14-32-32v-47Z"
            fill={`url(#g-${variant})`}
            opacity="0.22"
          />
          <path
            d="M136 92c38-30 78-44 120-40 53 6 92 42 139 70 31 19 61 30 95 26"
            stroke={`url(#g-${variant})`}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <g opacity="0.95">
            <rect x="110" y="120" width="120" height="160" rx="22" fill="white" opacity="0.45" />
            <rect x="250" y="100" width="160" height="200" rx="26" fill="white" opacity="0.38" />
          </g>
          <g opacity="0.85">
            <circle cx="425" cy="82" r="16" fill="white" opacity="0.4" />
            <circle cx="455" cy="110" r="9" fill={start} opacity="0.35" />
            <circle cx="390" cy="115" r="10" fill="#f59e0b" opacity="0.3" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default function AuthLayout({ variant = 'user', headline, description, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="relative overflow-hidden">
        <div className="absolute -top-48 -left-32 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
              <aside className="md:w-5/12 lg:w-5/12">
                <div className="h-full flex flex-col justify-center">
                  <BrandMark variant={variant} />
                  <BrandIllustration variant={variant} />

                  <div className="mt-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{headline}</h1>
                    <p className="mt-3 text-base sm:text-lg text-slate-700/90 max-w-md">{description}</p>
                  </div>
                </div>
              </aside>

              <main className="md:w-7/12 lg:w-7/12 flex items-center">
                <div className="w-full">{children}</div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

