import {getProperties} from "../repositories/propertyRepository";

export function validatePostcode(postcode: string) {
  // official UK postcode regex
  // source: https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/488478/Bulk_Data_Transfer_-_additional_validation_valid_from_12_November_2015.pdf, page 6, 3.1
  const validUkPostcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
  return validUkPostcodeRegex.test(postcode);
}

export async function validatePostcodesOfProperties() {
  const properties = await getProperties();
  const propertiesWithInvalidUKPostcodes = properties.filter(property => !validatePostcode(property.postcode));
  return propertiesWithInvalidUKPostcodes.map(property => property.id);
}
