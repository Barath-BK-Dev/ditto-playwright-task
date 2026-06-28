import { Locator, Page, expect } from "@playwright/test";

export class PremiumPage {
  constructor(private page: Page) {}
  get premiumPrice(): Locator {
    return this.page
      .locator("div.mantine-Group-root")
      .filter({ hasText: "Total Premium" })
      .locator("span")
      .last();
  }

  async getPremiumPrice() {
    return await this.premiumPrice.innerText();
  }

  async openAddOn() {
    await this.page
      .getByRole("button", { name: "Other Add-ons (0/3)", exact: true })
      .click();
  }

  async selectAddOn(addon: string) {
    await this.page.locator(`input[name="${addon}"]`).first().check();
  }

  async verifyPremiumChanged(oldPremium: string) {
    await expect(this.premiumPrice).not.toHaveText(oldPremium);
  }
}
