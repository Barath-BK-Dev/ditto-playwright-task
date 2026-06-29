import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DittoLandingPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }

  plan(insurer: string, plan: string): Locator {
    return this.page
      .locator('[style*="cursor: pointer"]')
      .filter({
        has: this.page.getByText(insurer, { exact: true }),
      })
      .filter({
        has: this.page.getByText(plan, { exact: true }),
      });
  }

  async goto() {
    await super.goto("/fq");
    this.log("Launching Ditto.....");
  }
  async selectPlan(insurer: string, plan: string) {
    //card selection
    await this.plan(insurer, plan).click();
    this.log(`Selecting Plan: ${insurer} - ${plan}`);
  }
}
