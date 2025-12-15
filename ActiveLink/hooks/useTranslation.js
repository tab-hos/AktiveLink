import { useLanguage } from '../contexts/LanguageContext';
import { translations as enTranslations } from '../translations/en.js';
import { translations as fiTranslations } from '../translations/fi.js';

const translationMap = {
  en: enTranslations,
  fi: fiTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();
  const t = translationMap[language] || enTranslations;

  return { t, language };
};

