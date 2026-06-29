import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PremiumPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }
  get premiumPrice() {
    return this.page
      .getByText("Total Premium", { exact: true })
      .locator("xpath=following-sibling::span");
  }
  get basePremiumPrice() {
    return this.page
      .getByText("Base Premium", { exact: true })
      .locator("xpath=following-sibling::span");
  }
  get addonPrice() {
    return this.page
      .locator("button")
      .filter({ hasText: "Other Add-ons" })
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
  toAmount(value: string): number {
    return Number(value.replace(/[^\d]/g, ""));
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
    this.log(`Adding Add-on: ${addon}`);
  }
  async verifyPremiumUpdated(oldPremium: string) {
    await expect(this.premiumPrice).not.toHaveText(oldPremium);
  }
  async verifyPremiumCalculation() {
    const base = this.toAmount(await this.getBasePremiumPrice());
    const addon = this.toAmount(await this.getAddonPrice());
    const total = this.toAmount(await this.getPremiumPrice());

    expect(base + addon).toBe(total);

    this.log(`Verified: ${base} + ${addon} = ${total}`);
  }
  async logPremiumBreakdown(stage: string) {
    this.log(`=========${stage}==========`);
    this.log(`Base Premium : ${await this.getBasePremiumPrice()} `);
    this.log(`Add-on Price : ${await this.getAddonPrice()} `);
    this.log(`Total Premium : ${await this.getPremiumPrice()} `);
  }
}
