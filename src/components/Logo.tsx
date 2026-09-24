interface LogoProps {
  height?: number;
}

export function Logo({ height = 34 }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        viewBox="44 34 254 254"
        height={height}
        width={height}
        role="img"
        aria-label="StockLess"
        style={{ flexShrink: 0 }}
      >
        <g transform="translate(18 11) scale(.58)">
          <rect x="104" y="48" width="72" height="244" rx="20" fill="#0F6664"/>
          <rect x="195" y="111" width="72" height="181" rx="20" fill="#16958B"/>
          <rect x="286" y="164" width="72" height="128" rx="20" fill="#65C9BC"/>
          <path d="M374 142C374 92 409 63 459 63C459 112 426 142 374 142Z" fill="#0A504F"/>
          <circle cx="386" cy="222" r="40" fill="#E0A63A"/>
          <path d="M414 193L437 216L415 236C409 219 409 207 414 193Z" fill="#FFFFFF"/>
          <path d="M52 242H94C109 242 121 249 130 261L149 285C159 298 175 305 192 305H396C415 305 431 293 437 275L448 242H476V370C476 424 432 468 378 468H150C96 468 52 424 52 370V242Z" fill="#0F6664"/>
          <path d="M52 242H94C109 242 121 249 130 261L149 285C159 298 175 305 192 305H396C415 305 431 293 437 275L448 242" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="206" y="382" width="154" height="30" rx="15" fill="#FFFFFF"/>
        </g>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '18px',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        <span style={{ color: 'var(--ink)' }}>Stock</span>
        <span style={{ color: 'var(--teal)' }}>Less</span>
      </span>
    </div>
  );
}
