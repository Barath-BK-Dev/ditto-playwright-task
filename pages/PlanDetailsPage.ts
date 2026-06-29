import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PlanDetailPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }

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
    this.log("Plan Selected");
  }
  async verifyMainBenefitsVisible() {
    await expect(this.mainBenifitButton).toBeVisible();
  }
  async openDiseaseList() {
    await this.nextStepButton.click();
    await this.fullListButton.click();
    await expect(this.diseaseHeading).toBeVisible({});
    await this.closeButton.click();
    this.log("Opening disease list...");
  }
  async proceedToMemberDetails() {
    await this.nextStepButton.click();
    await this.nextStepButton.click();
    await this.continuousButton.click();
    await expect(this.page).toHaveURL(/\/members/);
    this.log("Proceeding to member details...");
  }
}
