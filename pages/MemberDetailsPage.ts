import { Locator, Page } from "@playwright/test";

export class MemberDetailsPage {
  constructor(private page: Page) {}
  get nextStepButton(): Locator {
    return this.page.getByRole("button", { name: "Next step" });
  }
  get ageTextBox(): Locator {
    return this.page.getByPlaceholder("Your age");
  }
  get pincodeTextBox(): Locator {
    return this.page.getByPlaceholder("Enter your pin code");
  }
  get calculatePremiumButton(): Locator {
    return this.page.getByRole("button", { name: "Calculate Premium" });
  }
  gender(gender: string): Locator {
    return this.page
      .locator("div.mantine-Group-root")
      .filter({ hasText: /^SelfMaleFemale$/ })
      .getByText(gender, { exact: true });
  }

  async selectMembers(gender: string) {
    await this.gender(gender).click();
    await this.nextStepButton.click();
  }
  async fillMemberDetails(age: string, pincode: string) {
    await this.ageTextBox.fill(age);
    await this.pincodeTextBox.fill(pincode);
  }
  async clickCalculatePremium() {
    await this.calculatePremiumButton.click();
  }
}
