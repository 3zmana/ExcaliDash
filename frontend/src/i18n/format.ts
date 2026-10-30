import { formatDistanceToNow, type Locale as DateFnsLocale } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import type { Locale } from "./index";

const dateFnsLocales: Record<Locale, DateFnsLocale> = {
  en: enUS,
  "zh-CN": zhCN,
};

type DateInput = Date | string | number;

export const formatDateTime = (
  value: DateInput,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
): string => new Date(value).toLocaleString(locale, options);

// "3 hours ago" / "3 小时前"
export const formatRelativeTime = (value: DateInput, locale: Locale): string =>
  formatDistanceToNow(value, {
    addSuffix: true,
    locale: dateFnsLocales[locale],
  });

// "a, b, and c" / "a、b和c"
export const formatList = (items: string[], locale: Locale): string =>
  new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(
    items,
  );
