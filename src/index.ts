import {calculateAverageRentOfPropertiesByRegion} from "./averageRent/averageRent";
import {Regions} from "./model/Property";
import {formatCurrency} from "./utils/currencyFormatting";
import {calculateMonthlyRentPerTenantForProperty} from "./monthlyRentPerTenant/monthlyRentPerTenant";
import {validatePostcodesOfProperties} from "./postcodeValidation/postcodeValidation";
import {getStatusForProperty} from "./propertyStatus/propertyStatus";

async function requirement1() {
  console.log("- Requirement 1");
  await Promise.all(
    Regions.map(async (region) => {
      try {
        const averageRent = await calculateAverageRentOfPropertiesByRegion(region);
        console.log(`Average rent in ${region} is ${formatCurrency(averageRent)}`);
      } catch (error) {
        console.error(`Error calculating average rent: ${(error as Error).message}`);
      }
    })
  );
}

async function requirement2() {
  console.log("- Requirement 2");
  const propertyIds = ["p_1007", "p_1015", "p_1070"];
  await Promise.all(
    propertyIds.map(async (propertyId) => {
      try {
        const monthlyRentPerTenant = await calculateMonthlyRentPerTenantForProperty(propertyId, "PENCE");
        console.log(`Monthly rent for property ${propertyId} is ${formatCurrency(monthlyRentPerTenant)}`);
      } catch (error) {
        console.error(`Error calculating monthly rent: ${(error as Error).message}`);
      }
    })
  );
}

async function requirement3() {
  console.log("- Requirement 3");
  const propertiesWithInvalidUKPostcodes = await validatePostcodesOfProperties()
  propertiesWithInvalidUKPostcodes.forEach(propertyId => {
    console.log(`Property ${propertyId} has an invalid postcode`);
  })
}

async function requirement4() {
  console.log("- Requirement 4");
  const propertyIds = ["p_1029", "p_1002", "p_1022", "p_1004"];
  await Promise.all(
    propertyIds.map(async (propertyId) => {
      try {
        const propertyStatus = await getStatusForProperty(propertyId, new Date().toISOString());
        console.log(`Status of property ${propertyId} is ${propertyStatus} today`);
      } catch (error) {
        console.error(`Error calculating property status: ${(error as Error).message}`);
      }
    })
  );
}

async function main() {
  console.log("Reposit challenge")
  await requirement1();
  await requirement2();
  await requirement3();
  await requirement4();
}

main().catch((error) => {
  console.error(error);
});