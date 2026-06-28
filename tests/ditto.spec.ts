import { expect, test } from "@playwright/test";
import data from "../testData/ditto.json";
import { DittoLandingPage } from "../pages/DittoLandingPage";
import { PlanDetailPage } from "../pages/PlanDetailsPage";

test("Ditto Insurance typescript", async ({ page }) => {
  const landing = new DittoLandingPage(page);
  const details = new PlanDetailPage(page);

  await landing.goto();
  await landing.selectPlan(data.insurer, data.plan);
  await expect(page.locator(".mantine-AppShell-root")).toBeVisible();

  //After card selection
  await details.verifyPlanSelected(data.plan);
  await details.verifyMainBenifitsVisible();
  await details.openDiseaseList();
  await details.continueTillMembershipPage(); //Next Steps will be performed here

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

  await page.locator(`input[name="${data.addon}"]`).first().check();

  await expect(premiumPrice).not.toHaveText(withoutAddOn);

  const withAddOn = await premiumPrice.innerText();
  console.log(`Total Premium: ` + withAddOn);
});
