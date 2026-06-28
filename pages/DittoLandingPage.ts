import { Locator, Page } from "@playwright/test";

export class DittoLandingPage {
  constructor(private page: Page) {}

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
    await this.page.goto("/fq");
  }
  async selectPlan(insurer: string, plan: string) {
    //card selection
    await this.plan(insurer, plan).click();
  }
}
