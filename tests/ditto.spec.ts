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
  await details.verifySelectedPlan(data.plan);
  await details.verifyMainBenefitsVisible();
  await details.openDiseaseList();
  await details.proceedToMemberDetails(); //Next Steps will be performed here

  await members.selectMembers(data.gender); //selecting myself
  await members.fillMemberDetails(data.age, data.pincode);
  await members.clickCalculatePremium();

  //Getting Base premium price and addon price seperately and Math for Total price
  const totalPremiumBeforeAddon = await premium.getPremiumPrice();
  await premium.logPremiumBreakdown("Before Add-ons");
  await premium.verifyPremiumCalculation();

  await premium.openAddOn();
  await premium.selectAddOn(data.addon);
  await premium.verifyPremiumUpdated(totalPremiumBeforeAddon);

  await premium.logPremiumBreakdown("After Add-ons");
  await premium.verifyPremiumCalculation();
});
