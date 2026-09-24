import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { HowItWorksModal } from './HowItWorksModal';
import { Logo } from './Logo';
import { PreviewProvider, usePreview } from '../PreviewContext';
import { LanguageProvider, useTranslation, type Lang } from '../i18n/LanguageContext';

export function Layout() {
  return (
    <LanguageProvider>
      <PreviewProvider>
        <LayoutInner />
      </PreviewProvider>
    </LanguageProvider>
  );
}

const LANG_OPTIONS: { code: Lang; key: 'lang.en' | 'lang.ms' | 'lang.zh' }[] = [
  { code: 'en', key: 'lang.en' },
  { code: 'ms', key: 'lang.ms' },
  { code: 'zh', key: 'lang.zh' },
];

function LayoutInner() {
  const [showModal, setShowModal] = useState(false);
  const { isReturning, setIsReturning } = usePreview();
  const { lang, setLang, t } = useTranslation();
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--page)' }}>
      <header style={{
        borderBottom: '1px solid var(--line)',
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 'var(--page-max-width)',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}>
          {/* Logo */}
          <a href="/" style={{ marginRight: 'auto', lineHeight: 0 }}>
            <Logo height={34} />
          </a>

          {/* Dev preview switcher — Home only */}
          {onHome && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: '#18222A',
              border: '1px solid #2C3A42',
              borderRadius: '6px',
              padding: '4px 8px',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-data)',
                fontSize: '9px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#607080',
                marginRight: '2px',
              }}>
                Preview
              </span>
              {(['First visit', 'Returning'] as const).map((label) => {
                const active = label === 'Returning' ? isReturning : !isReturning;
                return (
                  <button
                    key={label}
                    onClick={() => setIsReturning(label === 'Returning')}
                    style={{
                      fontFamily: 'var(--font-data)',
                      fontSize: '11px',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#18222A' : '#7A9AAA',
                      background: active ? '#8FD2C8' : 'transparent',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '3px 8px',
                      cursor: 'pointer',
                      transition: 'all 120ms ease',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Language switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--line-soft)',
            border: '1px solid var(--line)',
            borderRadius: '6px',
            padding: '3px',
            gap: '2px',
            flexShrink: 0,
          }}>
            {LANG_OPTIONS.map(({ code, key }) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  aria-pressed={active}
                  style={{
                    fontFamily: 'var(--font-data)',
                    fontSize: '11px',
                    fontWeight: active ? 700 : 400,
                    color: active ? 'var(--ink)' : 'var(--muted)',
                    background: active ? '#fff' : 'transparent',
                    border: active ? '1px solid var(--line)' : '1px solid transparent',
                    borderRadius: '4px',
                    padding: '3px 9px',
                    cursor: 'pointer',
                    transition: 'all 130ms ease',
                    boxShadow: active ? '0 1px 2px rgba(22,49,59,.06)' : 'none',
                    lineHeight: 1.4,
                  }}
                >
                  {t(key)}
                </button>
              );
            })}
          </div>

          {/* How it works */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-secondary)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--teal)',
              cursor: 'pointer',
              padding: '6px 0',
              letterSpacing: '0.01em',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {t('nav.howItWorks')}
          </button>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {showModal && <HowItWorksModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
