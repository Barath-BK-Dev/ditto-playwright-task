import { Page, expect } from "@playwright/test";

export class PlanDetailPage {
  constructor(private page: Page) {}

  async verifyPlanSelected(plan: string) {
    await expect(this.page.locator("body")).toContainText(plan);
  }
  async verifyMainBenifitsVisible() {
    await expect(
      this.page.getByRole("button", { name: "Main Benefits" }),
    ).toBeVisible();
  }
  async openDiseaseList() {
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.getByRole("button", { name: "Full list" }).click();
    await expect(
      this.page.getByRole("heading", { name: "List of diseases", exact: true }),
    ).toBeVisible({});
    await this.page.getByRole("button", { name: "Close" }).click();
  }

  async continueTillMembershipPage() {
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.getByRole("button", { name: "Continue" }).click();
    await expect(this.page).toHaveURL(/\/members/);
  }
}
