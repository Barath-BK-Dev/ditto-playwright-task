import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MemberDetailsPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }
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
    this.log(`Selecting gender: ${gender}`);
  }
  async fillMemberDetails(age: string, pincode: string) {
    await this.ageTextBox.fill(age);
    await this.pincodeTextBox.fill(pincode);
    this.log("Filling member details...");
  }
  async clickCalculatePremium() {
    await this.calculatePremiumButton.click();
    this.log("Calculating premium...");
  }
}
