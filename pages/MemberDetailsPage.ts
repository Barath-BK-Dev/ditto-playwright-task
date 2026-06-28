import { Page } from "@playwright/test";

export class MemberDetailsPage {
  constructor(private page: Page) {}

  async selectMembers(gender: string) {
    await this.page
      .locator("div.mantine-Group-root")
      .filter({ hasText: /^SelfMaleFemale$/ })
      .getByText(gender, { exact: true })
      .click();
    await this.page.getByRole("button", { name: "Next step" }).click();
  }

  async enterDetails(age: string, pincode: string) {
    await this.page.getByPlaceholder("Your age").fill(age);
    await this.page.getByPlaceholder("Enter your pin code").fill(pincode);
  }

  async clickCalculatePremium() {
    await this.page.getByRole("button", { name: "Calculate Premium" }).click();
  }
}
