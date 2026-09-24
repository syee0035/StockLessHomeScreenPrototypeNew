import { Card } from '../components/ui';
import { useTranslation } from '../i18n/LanguageContext';

export function ColumnMatching() {
  const { t } = useTranslation();
  return (
    <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
      <Card style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-10)', border: '2px dashed var(--line)', boxShadow: 'none' }}>
        <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mint)', marginBottom: 'var(--space-3)', fontWeight: 600 }}>
          {t('placeholder.step', { n: 2 })}
        </p>
        <h1 style={{ fontSize: 'var(--text-section-head)', color: 'var(--ink)', marginBottom: 'var(--space-3)' }}>{t('columns.title')}</h1>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)' }}>{t('columns.desc')}</p>
      </Card>
    </div>
  );
}
