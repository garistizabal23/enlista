type Locale = 'en-US' | 'es-CO';
type Currency = 'USD' | 'EUR' | 'COP';

export const formatCurrency = (
  value: number,
  locale: Locale = 'es-CO',
  currency: Currency = 'COP'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
