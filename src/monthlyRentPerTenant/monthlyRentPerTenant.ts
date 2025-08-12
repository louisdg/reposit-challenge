import {getProperties} from "../repositories/propertyRepository";
import {getTenants} from "../repositories/tenantRepository";
import unreachableSwitchBranch from "../utils/unreachableSwitchBranch";

export type CurrencyUnit = "PENCE" | "POUNDS";

export async function calculateMonthlyRentPerTenantForProperty(propertyId: string, currencyUnit: CurrencyUnit = "PENCE") {
  const properties = await getProperties();
  const propertyWithId = properties.find(property => property.id === propertyId);
  if (!propertyWithId) {
    throw new Error(`No property with id ${propertyId}`);
  }
  const tenants = await getTenants();
  const tenantsForProperty = tenants.filter(tenant => tenant.propertyId === propertyId);
  const numberOfTenantsForProperty = tenantsForProperty.length;
  if(numberOfTenantsForProperty === 0) {
    throw new Error(`No tenants found in property ${propertyId}`);
  }

  const monthlyRentPerTenantsForPropertyInPence = propertyWithId.monthlyRentPence / numberOfTenantsForProperty;

  switch (currencyUnit) {
    case "PENCE":
      return monthlyRentPerTenantsForPropertyInPence;
    case "POUNDS":
      return monthlyRentPerTenantsForPropertyInPence / 100;
    default:
      unreachableSwitchBranch(currencyUnit);
  }
}
