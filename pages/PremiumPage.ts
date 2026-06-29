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
  get basePremiumPrice(): Locator {
    return this.page
      .locator("div.mantine-Group-root")
      .filter({ hasText: "Base Premium" })
      .locator("span")
      .last();
  }
  get addonPrice(): Locator {
    return this.page
      .locator("div.mantine-Group-root")
      .filter({ hasText: /^Other Add-ons/ })
      .locator("span")
      .last();
  }
  get addonButton() {
    return this.page.getByRole("button", {
      name: "Other Add-ons (0/3)",
      exact: true,
    });
  }
  addon(addon: string): Locator {
    return this.page.locator(`input[name="${addon}"]`).first();
  }

  async getPremiumPrice() {
    return await this.premiumPrice.innerText();
  }
  async getBasePremiumPrice() {
    return await this.basePremiumPrice.innerText();
  }
  async getAddonPrice() {
    return await this.addonPrice.innerText();
  }
  async openAddOn() {
    await this.addonButton.click();
  }
  async selectAddOn(addon: string) {
    await this.addon(addon).check();
  }
  async verifyPremiumUpdated(oldPremium: string) {
    await expect(this.premiumPrice).not.toHaveText(oldPremium);
  }
}
