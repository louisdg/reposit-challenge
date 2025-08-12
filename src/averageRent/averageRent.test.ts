import {calculateAverageRentOfPropertiesByRegion} from "./averageRent";
import {Region} from "../model/Property";

describe('calculateAverageRentOfPropertiesByRegion', () => {
  it.each([
    {region: "ENGLAND", expectedAverageRentOfProperties: 166929},
    {region: "N.IRELAND", expectedAverageRentOfProperties: 133991},
    {region: "SCOTLAND", expectedAverageRentOfProperties: 186373},
    {region: "WALES", expectedAverageRentOfProperties: 152956},
  ] as const)(
    "should calculate the average rent of properties in $region",
    async ({region, expectedAverageRentOfProperties}) => {
      const averageRentOfProperties =
        await calculateAverageRentOfPropertiesByRegion(region);
      expect(averageRentOfProperties).toBeCloseTo(expectedAverageRentOfProperties, 0);
    },
  );

  it("should throw an error if no properties were found in the region", async () => {
    await expect(calculateAverageRentOfPropertiesByRegion("NON_EXISTENT_REGION" as Region))
      .rejects
      .toThrow("No properties found in NON_EXISTENT_REGION");
  });
});