import { useEffect, useRef } from 'react';
import { Eyebrow, Card } from './ui';
import { useTranslation } from '../i18n/LanguageContext';

interface Props {
  onClose: () => void;
}

export function HowItWorksModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(22, 49, 59, .5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <Card style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 'var(--space-10)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
          <div>
            <Eyebrow>{t('modal.eyebrow')}</Eyebrow>
            <h2 style={{ fontSize: 'var(--text-page-title)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {t('modal.heading')}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={t('nav.close')}
            style={{
              background: 'none', border: '1px solid var(--line)',
              borderRadius: '6px', padding: '4px 10px',
              color: 'var(--muted)', fontSize: '16px',
              cursor: 'pointer', marginTop: '4px', flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
        <HowItWorksContent />
      </Card>
    </div>
  );
}

export function HowItWorksContent() {
  const { t } = useTranslation();

  const steps = [1, 2, 3, 4] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
      {/* Steps */}
      <section>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {steps.map((n) => (
            <li key={n} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 'var(--space-4)', alignItems: 'start' }}>
              <span style={{
                fontFamily: 'var(--font-data)', fontSize: 'var(--text-description)', fontWeight: 600,
                color: '#fff', background: 'var(--teal)', borderRadius: '50%',
                width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: '1px',
              }}>{n}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', color: 'var(--ink)', marginBottom: '3px' }}>
                  {t(`step.${n}.label` as `step.${typeof n}.label`)}
                </p>
                <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {t(`step.${n}.desc` as `step.${typeof n}.desc`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* What you get */}
      <section>
        <Eyebrow>{t('whatYouGet.eyebrow')}</Eyebrow>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <li key={n} style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'baseline' }}>
              <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>–</span>
              <span style={{ fontSize: 'var(--text-body)', color: 'var(--ink-2)' }}>
                {t(`whatYouGet.item.${n}` as `whatYouGet.item.${typeof n}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Privacy */}
      <section style={{
        background: 'var(--teal-tint)', border: '1px solid var(--mint)',
        borderRadius: 'var(--radius)', padding: 'var(--space-4) var(--space-5)',
      }}>
        <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--ink-2)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            {t('privacy.heading')}.
          </strong>{' '}
          {t('privacy.modalNote')}
        </p>
      </section>
    </div>
  );
}
