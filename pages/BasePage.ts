import { Locator, Page } from "@playwright/test";
export class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  protected log(message: string) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
  }
}
