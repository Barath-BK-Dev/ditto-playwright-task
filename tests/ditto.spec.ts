import { expect, test } from "@playwright/test";
import data from "../testData/ditto.json";
import { DittoLandingPage } from "../pages/DittoLandingPage";
import { PlanDetailPage } from "../pages/PlanDetailsPage";
import { MemberDetailsPage } from "../pages/MemberDetailsPage";
import { PremiumPage } from "../pages/PremiumPage";

test("Ditto Insurance typescript", async ({ page }) => {
  const landing = new DittoLandingPage(page);
  const details = new PlanDetailPage(page);
  const members = new MemberDetailsPage(page);
  const premium = new PremiumPage(page);

  await landing.goto();
  await landing.selectPlan(data.insurer, data.plan);
  await expect(page.locator(".mantine-AppShell-root")).toBeVisible();

  //After card selection
  await details.verifyPlanSelected(data.plan);
  await details.verifyMainBenifitsVisible();
  await details.openDiseaseList();
  await details.continueTillMembershipPage(); //Next Steps will be performed here

  await members.selectMembers(); //selecting myself
  await members.enterDetails(data.age, data.pincode);
  await members.clickCalculatePremium();

  const priceWithoutAddOn = await premium.getPremiumPrice();
  console.log(`Total Premium Without add on: ` + priceWithoutAddOn);

  await premium.openAddOn();
  await premium.selectAddOn(data.addon);
  await premium.verifyPremiumChanged(priceWithoutAddOn);
  const withAddOn = await premium.getPremiumPrice();
  console.log(`Total Premium with add on: ` + withAddOn);
});
