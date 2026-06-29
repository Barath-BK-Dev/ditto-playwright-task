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

  await members.selectMembers(data.gender); //selecting myself
  await members.enterDetails(data.age, data.pincode);
  await members.clickCalculatePremium();

  //Getting Base premium price and addon price seperately and Math for Total price
  const basePremiumPrice = await premium.getBasePremiumPrice();
  const addonPrice = await premium.getAddonPrice();
  console.log("--------Before Add-ons---------");

  console.log(`Base Premium Price: ${basePremiumPrice}`);
  console.log(`Add-ons Price: ${addonPrice}`);

  const priceWithoutAddOn = await premium.getPremiumPrice();
  console.log(`Total Premium Without add on: ` + priceWithoutAddOn);

  await premium.openAddOn();
  await premium.selectAddOn(data.addon);

  console.log("--------After Add-ons---------");

  await premium.verifyPremiumChanged(priceWithoutAddOn);

  const updatedAddonPrice = await premium.getAddonPrice();
  console.log(`Base Premium Price: ${basePremiumPrice}`);
  console.log(`Add-ons Price: ${updatedAddonPrice}`);
  const premiumWithAddon = await premium.getPremiumPrice();
  await expect(parseInt(basePremiumPrice) + parseInt(updatedAddonPrice)).toBe(
    parseInt(premiumWithAddon),
  );
  console.log(`Total Premium with add on: ` + premiumWithAddon);
});
