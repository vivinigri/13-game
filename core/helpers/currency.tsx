import dayjs from 'dayjs';

export const currency = (value?: number) => {
  if (!value) return `${getLocaleCurrencySign()}0`;

  const amount = value > 100 ? Math.ceil(value) : Math.round(value * 100) / 100;

  if (amount < 0) {
    return (
      '-$' +
      amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace('-', '')
    );
  }

  return (
    getLocaleCurrencySign() +
    amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};

export const deCurrency = (currency: string) => {
  currency = currency.replace(/\D/g, '');
  if (currency.indexOf('-') > -1) {
    currency = currency.replace(/-/g, '');
    currency = '-' + currency;
  }

  return currency.replace(/[,$]/g, '');
};

const CURRENCIES: any = {
  en: 'USD',
  pt: 'BRL',
  ar: 'ARS',
};

export const formatCurrency = (
  amount: number,
  digits: number = 2,
  addCurrency: boolean = false
) => {
  let amountStr = Number(amount).toFixed(digits);
  const currency = CURRENCIES[dayjs.locale()];
  if (['BRL', 'ARS'].includes(currency)) {
    amountStr = amountStr.replace('.', ',');
    amountStr = amountStr.replace(/\d(?=(\d{3})+(\,|$))/g, '$&.');
  } else if (currency == 'USD') {
    amountStr = amountStr.replace(/\d(?=(\d{3})+(\.|$))/g, '$&,');
  }

  return (addCurrency ? getLocaleCurrencySign() : '') + amountStr;
};

export const formatLocalCurrency = (
  amount: number = 0,
  addCurrency: boolean = false,
  digits: number = 2
) => {
  const config = {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    ...(addCurrency && {
      style: 'currency',
      currency: CURRENCIES[dayjs.locale()],
    }),
  };
  // const currencyFormatter = new Intl.NumberFormat(dayjs.locale(), config);
  // return currencyFormatter.format(amount || 0);
  return amount.toLocaleString(dayjs.locale(), config);
};

export const getLocaleCurrencySign = () => {
  const amount = 0;
  return amount
    .toLocaleString(dayjs.locale(), {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      style: 'currency',
      currency: CURRENCIES[dayjs.locale()],
    })
    .replace('0', '');
};
