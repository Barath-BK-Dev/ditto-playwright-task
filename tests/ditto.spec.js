import { expect, test } from "@playwright/test";
import { trace } from "node:console";

test("Ditto Insurance", async ({ page }) => {
  await page.goto("https://app.joinditto.in/fq", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator(".mantine-AppShell-root")).toBeVisible();

  //card selection
  const insurer = "CARE";
  const plan = "Care Freedom";
  const card = page
    .locator('[style*="cursor: pointer"]')
    .filter({
      has: page.getByText(insurer, { exact: true }),
    })
    .filter({
      has: page.getByText(plan, { exact: true }),
    });

  await card.click();
  await expect(page.locator("body")).toContainText(plan);

  await expect(
    page.getByRole("button", { name: "Main Benefits" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();

  await page.getByRole("button", { name: "Full list" }).click();

  await expect(
    page.getByRole("heading", { name: "List of diseases", exact: true }),
  ).toBeVisible({});
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/members/);
  await page
    .locator("div.mantine-Group-root")
    .filter({ hasText: /^SelfMaleFemale$/ })
    .getByText("Male", { exact: true })
    .click();
  await page.getByRole("button", { name: "Next step" }).click();

  await page.getByPlaceholder("Your age").fill("27");
  await page.getByPlaceholder("Enter your pin code").fill("560066");

  //   await page.getByRole("radio", { name: "No" }).check();
  await page.getByRole("button", { name: "Calculate Premium" }).click();

  const premiumPrice = page
    .locator("div.mantine-Group-root")
    .filter({ hasText: "Total Premium" })
    .locator("span")
    .last();

  const withoutAddOn = await premiumPrice.innerText();

  console.log(`Total Premium Without add on: ` + withoutAddOn);

  await page
    .getByRole("button", { name: "Other Add-ons (0/3)", exact: true })
    .click();

  const addon = "Care OPD";

  await page.locator(`input[name="${addon}"]`).first().check();

  await expect(premiumPrice).not.toHaveText(withoutAddOn);

  const withAddOn = await premiumPrice.innerText();
  console.log(`Total Premium: ` + withAddOn);
});
