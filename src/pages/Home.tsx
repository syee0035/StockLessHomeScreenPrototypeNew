import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eyebrow, Card, BtnPrimary, BtnSecondary } from '../components/ui';
import { HowItWorksContent } from '../components/HowItWorksModal';
import { usePreview } from '../PreviewContext';
import { Logo } from '../components/Logo';
import { useTranslation } from '../i18n/LanguageContext';

interface FileRecord {
  id: string; name: string; rows: number; uploadedAt: string;
}

const MOCK_FILES: FileRecord[] = [
  { id: '1', name: 'sales_week_37.csv',      rows: 482,  uploadedAt: '18 Sep 2026' },
  { id: '2', name: 'sales_aug_complete.csv', rows: 1104, uploadedAt: '2 Sep 2026'  },
  { id: '3', name: 'july_export.csv',        rows: 876,  uploadedAt: '5 Aug 2026'  },
];

export function Home() {
  const navigate = useNavigate();
  const { isReturning } = usePreview();
  const [files, setFiles] = useState<FileRecord[]>(MOCK_FILES);
  const deleteFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const showReturning = isReturning && files.length > 0;

  return (
    <div>
      {!showReturning
        ? <FirstTimeView onStart={() => navigate('/upload')} />
        : <ReturningView files={files} onDelete={deleteFile} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FIRST-TIME VIEW
══════════════════════════════════════════════════════════════════════════ */

function StepIcon({ n }: { n: number }) {
  const icons = [
    <path key="u" d="M8 13V7m0 0L5 10m3-3 3 3M3 16v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1" strokeLinecap="round" strokeLinejoin="round" />,
    <><path key="c1" d="M3 6h5v9H3zM9 6h5v9H9z" strokeLinejoin="round" /><path key="c2" d="M5 3v3M11 3v3" strokeLinecap="round" /></>,
    <path key="ch" d="M4 8l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />,
    <><path key="r1" d="M3 12h2m3-6h2m3 9h2" strokeLinecap="round" /><path key="r2" d="M3 15l3-6 3 4 3-5 3 7" strokeLinecap="round" strokeLinejoin="round" /></>,
  ];
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="var(--teal)" strokeWidth="1.5">
      {icons[n - 1]}
    </svg>
  );
}

function FirstTimeView({ onStart }: { onStart: () => void }) {
  return (
    <>
      <HeroSection onStart={onStart} />
      <InteractiveExample />
      <StepsSection />
      <WhatYouGetSection />
      <ProduceBand />
      <FoodWasteProblem />
      <SdgBlock />
      <PageFooter />
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

function HeroSection({ onStart }: { onStart: () => void }) {
  const { t, lang } = useTranslation();
  const isZh = lang === 'zh';

  return (
    <section style={{ textAlign: 'center', padding: 'var(--space-20) var(--space-6) var(--space-16)', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: 'var(--space-5)' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber-accent)', flexShrink: 0 }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-eyebrow)', fontWeight: 'var(--weight-bold)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal)', margin: 0 }}>
          {t('hero.eyebrow')}
        </p>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'clamp(36px, 6vw, 64px)',
        letterSpacing: isZh ? '0.01em' : '-0.03em',
        lineHeight: 1.05, color: 'var(--ink)',
        marginBottom: 'var(--space-6)',
      }}>
        {t('hero.line1.plain')}<span style={{ color: 'var(--amber-accent)' }}>{t('hero.line1.accent')}</span>
        <br />
        {t('hero.line2')}
      </h1>

      <p style={{ fontSize: 'var(--text-lead)', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto var(--space-8)' }}>
        {t('hero.subcopy')}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <BtnPrimary onClick={onStart}>{t('hero.cta')}</BtnPrimary>
        <a href="#how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-body)', color: 'var(--teal)' }}>
          {t('hero.link')}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 2v10M3 8l4 4 4-4" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ── Interactive example ──────────────────────────────────────────────────── */

const STOCK_ON_HAND = 12;
const DEMAND_LOW = 28;
const DEMAND_HIGH = 36;
const DEMAND_MID = Math.round((DEMAND_LOW + DEMAND_HIGH) / 2);

function InteractiveExample() {
  const { t } = useTranslation();
  const [planned, setPlanned] = useState(20);
  const [incoming, setIncoming] = useState(0);

  const estimated = Math.max(0, DEMAND_MID - STOCK_ON_HAND - incoming);
  const available = STOCK_ON_HAND + incoming + planned;

  let verdictKey: 'example.verdict.overstock' | 'example.verdict.low' | 'example.verdict.balanced';
  let detailKey: 'example.verdict.overstock.detail' | 'example.verdict.low.detail' | 'example.verdict.balanced.detail';
  let verdictColor: string;
  let verdictBg: string;
  let verdictBorder: string;

  if (available > DEMAND_HIGH) {
    verdictKey = 'example.verdict.overstock'; detailKey = 'example.verdict.overstock.detail';
    verdictColor = 'var(--amber)'; verdictBg = 'var(--amber-tint)'; verdictBorder = 'var(--amber-strong)';
  } else if (available < DEMAND_LOW) {
    verdictKey = 'example.verdict.low'; detailKey = 'example.verdict.low.detail';
    verdictColor = 'var(--red)'; verdictBg = 'var(--red-tint)'; verdictBorder = '#e9b4b4';
  } else {
    verdictKey = 'example.verdict.balanced'; detailKey = 'example.verdict.balanced.detail';
    verdictColor = 'var(--teal)'; verdictBg = 'var(--teal-tint)'; verdictBorder = 'var(--mint)';
  }

  const verdictDetail = t(detailKey, { available, low: DEMAND_LOW, high: DEMAND_HIGH });

  const pastWeeks = [5, 8, 6, 9, 7, 8, 6, 7];
  const chartW = 340, chartH = 80, maxVal = 14;
  const xStep = chartW / 12;
  const yPos = (v: number) => chartH - (v / maxVal) * chartH;
  const pastPts = pastWeeks.map((v, i) => `${i * xStep + xStep / 2},${yPos(v)}`).join(' ');
  const forecastPts = [7, 8, 7.5, 8].map((v, i) => `${(8 + i) * xStep + xStep / 2},${yPos(v)}`).join(' ');
  const dividerX = 8 * xStep;

  return (
    <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto var(--space-16)', padding: '0 var(--space-6)' }}>
      <div style={{ border: '3px solid var(--ink)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(22,49,59,.12)' }}>
        {/* Top bar */}
        <div style={{ background: 'var(--ink)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '7px' }}>
            {['#555', '#777', '#999'].map((c, i) => (
              <span key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-description)', fontWeight: 600, color: 'var(--teal)', background: 'var(--teal-tint)', borderRadius: '20px', padding: '3px 12px' }}>
            {t('example.chip')}
          </span>
        </div>

        {/* Two-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', background: '#fff' }}>
          {/* Left */}
          <div style={{ padding: 'var(--space-8)', borderRight: '1px solid var(--line)' }}>
            <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
              {t('example.productEyebrow')}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 'var(--space-3)' }}>
              Ikan Bilis 200g
            </h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
              {(['example.chip.ready', 'example.chip.steadySeller'] as const).map((key) => (
                <span key={key} style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-description)', fontWeight: 600, background: 'var(--teal-tint)', color: 'var(--teal)', border: '1px solid var(--mint)', borderRadius: '20px', padding: '3px 10px' }}>
                  {t(key)}
                </span>
              ))}
            </div>

            {/* Restock panel */}
            <div style={{ background: 'var(--ink)', borderRadius: 'var(--radius)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
              <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mint)', marginBottom: 'var(--space-2)' }}>
                {t('example.restock.eyebrow')}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '40px', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 'var(--space-2)' }}>
                {estimated} <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--mint)' }}>{t('example.restock.units')}</span>
              </p>
              <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--mint)', lineHeight: 1.5, marginBottom: 'var(--space-1)' }}>
                {t('example.restock.desc')}
              </p>
              <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-description)', color: '#5a7a80', lineHeight: 1.4 }}>
                {t('example.restock.formula')}
              </p>
            </div>

            {/* Chart */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 'var(--space-3)' }}>
                {t('example.chart.eyebrow')}
              </p>
              <svg viewBox={`0 0 ${chartW} ${chartH + 28}`} width="100%" style={{ display: 'block', minWidth: '280px' }}>
                <rect x={dividerX} y="0" width={chartW - dividerX} height={chartH} fill="rgba(143,210,200,.15)" />
                <line x1={dividerX} y1="0" x2={dividerX} y2={chartH} stroke="var(--teal)" strokeWidth="1" strokeDasharray="4 3" />
                <polyline points={pastPts} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                <polyline points={forecastPts} fill="none" stroke="var(--teal)" strokeWidth="2" strokeDasharray="5 3" strokeLinejoin="round" strokeLinecap="round" />
                {[0, 4, 8, 12].map((v) => (
                  <text key={v} x="0" y={yPos(v) + 4} fontFamily="Inter, sans-serif" fontSize="9" fill="var(--muted)">{v}</text>
                ))}
                <text x={dividerX / 2} y={chartH + 18} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--muted)">{t('example.chart.past')}</text>
                <text x={dividerX + (chartW - dividerX) / 2} y={chartH + 18} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--teal)">{t('example.chart.next')}</text>
              </svg>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              {([
                { key: 'example.metrics.demand', value: `${DEMAND_LOW}–${DEMAND_HIGH} ${t('example.restock.units')}` },
                { key: 'example.metrics.stock',  value: `${STOCK_ON_HAND} ${t('example.restock.units')}` },
                { key: 'example.metrics.avg',    value: `7 ${t('example.restock.units')}` },
                { key: 'example.metrics.cover',  value: '1.7 wks' },
              ] as const).map(({ key, value }) => (
                <div key={key} style={{ background: 'var(--line-soft)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-3) var(--space-4)' }}>
                  <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-description)', color: 'var(--muted)', marginBottom: '2px' }}>{t(key)}</p>
                  <p style={{ fontFamily: 'var(--font-data)', fontWeight: 600, fontSize: 'var(--text-body)', color: 'var(--ink)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: purchase controls */}
          <div style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
                {t('example.purchase.eyebrow')}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-section-head)', color: 'var(--ink)', lineHeight: 1.2 }}>
                {t('example.purchase.question')}
              </p>
            </div>

            <SliderField labelKey="example.slider.planned" value={planned} min={0} max={60} onChange={setPlanned} />
            <SliderField labelKey="example.slider.incoming" value={incoming} min={0} max={30} onChange={setIncoming} />

            <div style={{ border: `1px solid ${verdictBorder}`, borderRadius: 'var(--radius)', background: verdictBg, padding: 'var(--space-5)', marginTop: 'auto' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-body)', color: verdictColor, marginBottom: 'var(--space-2)' }}>
                {t(verdictKey)}
              </p>
              <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                {verdictDetail}
              </p>
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div style={{ borderTop: '1px solid var(--line)', background: 'var(--line-soft)', padding: '10px var(--space-8)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-description)', color: 'var(--muted)' }}>
            {t('example.footer')}
          </p>
        </div>
      </div>
    </section>
  );
}

function SliderField({ labelKey, value, min, max, onChange }: {
  labelKey: 'example.slider.planned' | 'example.slider.incoming';
  value: number; min: number; max: number; onChange: (v: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
        <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-secondary)', color: 'var(--ink-2)' }}>{t(labelKey)}</label>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: 'var(--font-data)', fontWeight: 600, fontSize: 'var(--text-body)', color: 'var(--ink)' }}>{value} {t('example.restock.units')}</span>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: '9px', background: 'var(--line-soft)', border: '1px solid var(--line)', borderRadius: '10px', padding: '1px 6px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{t('example.slider.tag')}</span>
        </span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--teal)', cursor: 'pointer' }} />
    </div>
  );
}

/* ── Steps ───────────────────────────────────────────────────────────────── */

function StepsSection() {
  const { t, lang } = useTranslation();
  const isZh = lang === 'zh';

  return (
    <section id="how-it-works" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
        <Eyebrow style={{ textAlign: 'center' }}>{t('steps.eyebrow')}</Eyebrow>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-page-title)',
          letterSpacing: isZh ? '0.01em' : '-0.025em', textAlign: 'center', marginBottom: 'var(--space-16)', lineHeight: 1.15,
        }}>
          {t('steps.heading.plain')}<span style={{ color: 'var(--teal)' }}>{t('steps.heading.accent')}</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '34px', left: '12.5%', right: '12.5%', height: '1px', background: 'var(--line)', zIndex: 0 }} />
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} style={{ padding: '0 var(--space-4)', position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-step-num)', color: 'var(--line-soft)', lineHeight: 1, marginBottom: 'var(--space-4)', letterSpacing: '-0.04em', userSelect: 'none' }}>
                {String(n).padStart(2, '0')}
              </p>
              <div style={{ width: '36px', height: '36px', background: 'var(--teal-tint)', border: '1px solid var(--mint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <StepIcon n={n} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>
                {t(`step.${n}.label` as `step.${typeof n}.label`)}
              </p>
              <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--muted)', lineHeight: 1.5 }}>
                {t(`step.${n}.desc` as `step.${typeof n}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── What you get + Privacy ──────────────────────────────────────────────── */

function WhatYouGetSection() {
  const { t } = useTranslation();

  return (
    <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto', padding: 'var(--space-20) var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
      <div>
        <Eyebrow>{t('whatYouGet.eyebrow')}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 'var(--space-6)' }}>
          {t('whatYouGet.heading.plain').split('\n').map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
          <span style={{ color: 'var(--teal)' }}>{t('whatYouGet.heading.accent')}</span>
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <li key={n} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
              <span style={{ width: '18px', height: '18px', background: 'var(--teal-tint)', border: '1px solid var(--mint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4l2 2 4-4" /></svg>
              </span>
              <span style={{ fontSize: 'var(--text-body)', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                {t(`whatYouGet.item.${n}` as `whatYouGet.item.${typeof n}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Card style={{ alignSelf: 'start' }}>
        <Eyebrow>{t('privacy.eyebrow')}</Eyebrow>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.015em', marginBottom: 'var(--space-4)', lineHeight: 1.2 }}>
          <span style={{ color: 'var(--teal)' }}>{t('privacy.heading')}</span>
        </h3>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 'var(--space-6)' }}>
          {t('privacy.body')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {(['privacy.noUploads', 'privacy.noAccount', 'privacy.noTracking'] as const).map((key) => (
            <div key={key} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }} />
              <span style={{ fontSize: 'var(--text-secondary)', color: 'var(--ink-2)' }}>{t(key)}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-8)' }}>
          <BtnPrimary onClick={() => {}}>{t('cta.getStarted')}</BtnPrimary>
        </div>
      </Card>
    </section>
  );
}

/* ── Produce band ─────────────────────────────────────────────────────────── */

function ProduceBand() {
  const { t } = useTranslation();

  return (
    <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto var(--space-20)', padding: '0 var(--space-6)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: '16px', overflow: 'hidden', minHeight: '340px' }}>
        <div style={{ background: 'var(--teal-tint)', padding: 'var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', justifyContent: 'center' }}>
          <Eyebrow>{t('band.eyebrow')}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink)' }}>
            {t('band.heading.plain')}<span style={{ color: 'var(--amber-accent)' }}>{t('band.heading.accent')}</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <BtnPrimary onClick={() => {}}>{t('band.cta')}</BtnPrimary>
            <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--muted)' }}>{t('band.subtext')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            {(['band.item.1', 'band.item.2', 'band.item.3'] as const).map((key) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff', border: '1px solid var(--mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 5l2.5 2.5 4.5-5" /></svg>
                </span>
                <span style={{ fontSize: 'var(--text-body)', color: 'var(--ink-2)', fontWeight: 'var(--weight-bold)' }}>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ minHeight: '340px', background: 'var(--teal-tint)' }}>
          <img src="https://stockless.pages.dev/homepage/retail-produce-2.jpg" alt={t('band.photo.alt')} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </section>
  );
}

/* ── Food waste problem ──────────────────────────────────────────────────── */

function FoodWasteProblem() {
  const { t } = useTranslation();

  const stats = [
    { figKey: 'stat.1.figure', descKey: 'stat.1.desc' },
    { figKey: 'stat.2.figure', descKey: 'stat.2.desc' },
    { figKey: 'stat.3.figure', descKey: 'stat.3.desc' },
    { figKey: 'stat.4.figure', descKey: 'stat.4.desc' },
  ] as const;

  return (
    <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto var(--space-20)', padding: '0 var(--space-6)' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-8)' }}>
        <Eyebrow>{t('foodWaste.eyebrow')}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', letterSpacing: '-0.025em', lineHeight: 1.2, color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>
          {t('foodWaste.heading')}
        </h2>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.7 }}>
          {t('foodWaste.body')}
        </p>
      </div>

      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '390px' }}>
        <img src="https://stockless.pages.dev/homepage/food-waste.jpg" alt={t('foodWaste.photo.alt')} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(16,41,27,.52) 100%)', pointerEvents: 'none' }} />
        <p style={{ position: 'absolute', bottom: '20px', left: '24px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: '#fff', margin: 0, lineHeight: 1.4 }}>
          {t('foodWaste.caption')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 'var(--space-10)' }}>
        {stats.map(({ figKey, descKey }, i) => (
          <div key={figKey} style={{ padding: '0 var(--space-6)', borderLeft: i > 0 ? '1px solid var(--line)' : 'none' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>
              {t(figKey)}
            </p>
            <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--muted)', lineHeight: 1.55 }}>
              {t(descKey)}
            </p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-description)', color: 'var(--muted-2)', textAlign: 'center' }}>
        {t('foodWaste.sources')}
      </p>
    </section>
  );
}

/* ── SDG block ───────────────────────────────────────────────────────────── */

function SdgBlock() {
  const { t } = useTranslation();

  return (
    <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto var(--space-20)', padding: '0 var(--space-6)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: '16px', overflow: 'hidden', minHeight: '320px' }}>
        <div style={{ background: '#bd8c2b', padding: 'var(--space-10)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '72px', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em', flexShrink: 0 }}>12</span>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,.85)', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.4, marginTop: '6px' }}>
              {t('sdg.responsible')}
            </p>
          </div>
          <svg viewBox="0 0 80 40" width="100%" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" style={{ opacity: 0.9, margin: '20px 0', display: 'block' }}>
            <path d="M40 20 C40 10 28 4 20 10 C12 16 12 24 20 30 C28 36 40 30 40 20 C40 10 52 4 60 10 C68 16 68 24 60 30 C52 36 40 30 40 20Z" />
          </svg>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', lineHeight: 1.3 }}>
            {t('sdg.tagline')}
          </p>
        </div>

        <div style={{ background: '#fff', padding: 'var(--space-10)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-5)' }}>
          <Eyebrow>{t('sdg.eyebrow')}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink)' }}>
            {t('sdg.heading')}
          </h2>
          <p style={{ fontSize: 'var(--text-lead)', color: 'var(--ink-2)', lineHeight: 1.65 }}>{t('sdg.lead')}</p>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 1.7 }}>{t('sdg.body')}</p>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */

function PageFooter() {
  const { t } = useTranslation();

  return (
    <footer style={{ borderTop: '1px solid var(--line)', maxWidth: 'var(--page-max-width)', margin: '0 auto', padding: 'var(--space-8) var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
      <Logo height={28} />
      <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--muted)' }}>{t('footer.tagline')}</p>
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-secondary)', color: 'var(--teal)', fontWeight: 'var(--weight-bold)' }}>
        {t('footer.backToTop')} ↑
      </a>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   RETURNING VISITOR VIEW
══════════════════════════════════════════════════════════════════════════ */

function ReturningView({ files, onDelete }: { files: FileRecord[]; onDelete: (id: string) => void }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: 'var(--space-16) var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      <header>
        <Eyebrow>{t('returning.eyebrow')}</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 'var(--space-4)' }}>
          {t('returning.heading')}
        </h1>
        <p style={{ fontSize: 'var(--text-lead)', color: 'var(--muted)', lineHeight: 1.6 }}>
          {t('returning.subtext')}
        </p>
      </header>

      <section>
        <p style={{ fontSize: 'var(--text-secondary)', color: 'var(--muted)', marginBottom: 'var(--space-4)' }}>
          {t('files.privacy')}
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-section-head)', color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>
          {t('files.heading')}
        </h2>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {files.map((file, i) => (
            <div key={file.id}
              style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-6)', borderTop: i > 0 ? '1px solid var(--line-soft)' : 'none', cursor: 'pointer', transition: 'background var(--transition)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-tint)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
            >
              <button onClick={() => navigate('/results')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', color: 'var(--ink)', marginBottom: '3px' }}>{file.name}</p>
                <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-secondary)', color: 'var(--muted)' }}>
                  {t('files.rows', { n: file.rows.toLocaleString() })} · {file.uploadedAt}
                </p>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
                style={{ background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-secondary)', color: 'var(--red)', cursor: 'pointer', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-sm)', transition: 'background var(--transition)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--red-tint)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                {t('files.delete')}
              </button>
            </div>
          ))}
        </Card>
      </section>

      <div>
        <BtnSecondary onClick={() => navigate('/upload')}>{t('files.uploadNew')}</BtnSecondary>
      </div>
    </div>
  );
}
