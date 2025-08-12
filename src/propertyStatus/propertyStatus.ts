import {getProperties} from "../repositories/propertyRepository";
import {getTenants} from "../repositories/tenantRepository";

export type PropertyStatus = "PROPERTY_VACANT" | "PARTIALLY_VACANT" | "PROPERTY_ACTIVE" | "PROPERTY_OVERDUE"

export async function getStatusForProperty(propertyId: string, date: string): Promise<PropertyStatus> {
  const properties = await getProperties();
  const propertyWithId = properties.find(property => property.id === propertyId);
  if (!propertyWithId) {
    throw new Error(`No property with id ${propertyId}`);
  }

  const tenants = await getTenants();
  const tenantsForProperty = tenants.filter(tenant => tenant.propertyId === propertyId);
  const numberOfTenantsForProperty = tenantsForProperty.length;
  if (numberOfTenantsForProperty === 0) {
    return "PROPERTY_VACANT";
  }

  const currentDate = new Date(date);
  const tenancyEndDate = new Date(propertyWithId.tenancyEndDate);
  if (currentDate.valueOf() >= tenancyEndDate.valueOf()) {
    return "PROPERTY_OVERDUE";
  }

  if (numberOfTenantsForProperty < propertyWithId.capacity) {
    return "PARTIALLY_VACANT";
  }

  return "PROPERTY_ACTIVE";
}

