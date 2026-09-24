import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Lang, type TranslationKey } from './translations';

const STORAGE_KEY = 'stockless-lang';
const LANGS: Lang[] = ['en', 'ms', 'zh'];

const DISPLAY_FONTS: Record<Lang, string> = {
  en: "'Manrope', system-ui, sans-serif",
  ms: "'Manrope', system-ui, sans-serif",
  zh: "'Noto Sans SC', 'Manrope', system-ui, sans-serif",
};

const HTML_LANG: Record<Lang, string> = { en: 'en', ms: 'ms', zh: 'zh' };

function loadLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as string[]).includes(stored)) return stored as Lang;
  } catch { /* ignore */ }
  return 'en';
}

function applyLang(lang: Lang) {
  document.documentElement.lang = HTML_LANG[lang];
  document.documentElement.style.setProperty('--font-display', DISPLAY_FONTS[lang]);
}

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const Ctx = createContext<LanguageCtx>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang);

  useEffect(() => { applyLang(lang); }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const t = useCallback((key: TranslationKey, vars?: Record<string, string | number>): string => {
    const str = translations[lang][key] ?? translations.en[key] ?? key;
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useTranslation() {
  return useContext(Ctx);
}

export type { Lang };
