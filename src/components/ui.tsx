import type { CSSProperties, ReactNode } from 'react';

/* ── Eyebrow label ─────────────────────────────────────────────────────── */
export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--teal)',
      marginBottom: 'var(--space-3)',
      ...style,
    }}>
      {children}
    </p>
  );
}

/* ── Card ──────────────────────────────────────────────────────────────── */
export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      padding: 'var(--space-8)',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Primary button ────────────────────────────────────────────────────── */
export function BtnPrimary({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-bold)',
        fontSize: 'var(--text-body)',
        color: '#fff',
        background: 'var(--teal)',
        border: '1px solid var(--teal-deep)',
        borderRadius: 'var(--radius-btn)',
        padding: '11px 24px',
        cursor: 'pointer',
        transition: 'background var(--transition)',
        lineHeight: 1,
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-deep)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
    >
      {children}
      <Arrow />
    </button>
  );
}

/* ── Secondary button ──────────────────────────────────────────────────── */
export function BtnSecondary({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-bold)',
        fontSize: 'var(--text-body)',
        color: 'var(--teal)',
        background: 'var(--card)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-btn)',
        padding: '11px 24px',
        cursor: 'pointer',
        transition: 'border-color var(--transition), background var(--transition)',
        lineHeight: 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--mint)';
        e.currentTarget.style.background = 'var(--teal-tint)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--line)';
        e.currentTarget.style.background = 'var(--card)';
      }}
    >
      {children}
    </button>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

/* ── Handwritten annotation ────────────────────────────────────────────── */
export function Annotation({
  text,
  rotate = -4,
  arrowPath,
  arrowViewBox = '0 0 60 60',
  arrowWidth = 60,
  style,
}: {
  text: string;
  rotate?: number;
  arrowPath: string;
  arrowViewBox?: string;
  arrowWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px',
      transform: `rotate(${rotate}deg)`,
      pointerEvents: 'none',
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-hand)',
        fontSize: 'var(--text-hand)',
        color: 'var(--teal)',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
      <svg
        viewBox={arrowViewBox}
        width={arrowWidth}
        fill="none"
        stroke="var(--teal)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.7}
      >
        <path d={arrowPath} />
      </svg>
    </div>
  );
}
