import { Locator, Page, expect } from "@playwright/test";

export class PlanDetailPage {
  constructor(private page: Page) {}

  get nextStepButton(): Locator {
    return this.page.getByRole("button", { name: "Next" });
  }
  get mainBenifitButton(): Locator {
    return this.page.getByRole("button", { name: "Main Benefits" });
  }
  get fullListButton(): Locator {
    return this.page.getByRole("button", { name: "Full list" });
  }
  get diseaseHeading(): Locator {
    return this.page.getByRole("heading", {
      name: "List of diseases",
      exact: true,
    });
  }
  get closeButton() {
    return this.page.getByRole("button", { name: "Close" });
  }
  get continuousButton() {
    return this.page.getByRole("button", { name: "Continue" });
  }

  async verifySelectedPlan(plan: string) {
    await expect(this.page.locator("body")).toContainText(plan);
  }
  async verifyMainBenifitsVisible() {
    await expect(this.mainBenifitButton).toBeVisible();
  }
  async openDiseaseList() {
    await this.nextStepButton.click();
    await this.fullListButton.click();
    await expect(this.diseaseHeading).toBeVisible({});
    await this.closeButton.click();
  }
  async proceedToMemberDetails() {
    await this.nextStepButton.click();
    await this.nextStepButton.click();
    await this.continuousButton.click();
    await expect(this.page).toHaveURL(/\/members/);
  }
}
