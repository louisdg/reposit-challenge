import {Region} from "../model/Property";
import {getProperties} from "../repositories/propertyRepository";

export async function calculateAverageRentOfPropertiesByRegion(region: Region) {
  const properties = await getProperties();
  const propertiesInRegion = properties.filter(property => property.region === region);
  if (propertiesInRegion.length === 0) {
    throw new Error(`No properties found in ${region}`);
  }

  return propertiesInRegion.reduce((average, property) => average + property.monthlyRentPence, 0) / propertiesInRegion.length;
}
