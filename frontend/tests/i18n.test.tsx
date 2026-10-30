import { describe, expect, it } from "vitest";
import { resolveLocale, translate } from "../src/i18n";
import { en } from "../src/i18n/locales/en";
import { zhCN } from "../src/i18n/locales/zh-CN";

describe("i18n", () => {
  it("uses the locale's own translation when it exists", () => {
    expect(translate("zh-CN", "sidebar.trash")).toBe("回收站");
  });

  it("falls back to English for keys a locale has not translated yet", () => {
    expect(zhCN["common.loading"]).toBeUndefined();
    expect(translate("zh-CN", "common.loading")).toBe(en["common.loading"]);
  });

  it("interpolates placeholders and leaves unknown ones untouched", () => {
    expect(translate("en", "dashboard.moveItemsTo", { count: 3 })).toBe(
      "Move 3 items to...",
    );
    expect(translate("en", "dashboard.moveItemsTo")).toBe(
      "Move {count} items to...",
    );
  });

  it("resolves browser and editor language codes to a supported locale", () => {
    expect(resolveLocale("zh-CN")).toBe("zh-CN");
    expect(resolveLocale("zh-TW")).toBe("zh-CN");
    expect(resolveLocale("en-GB")).toBe("en");
    expect(resolveLocale("fr-FR")).toBe("en");
    expect(resolveLocale(null)).toBe("en");
  });
});
