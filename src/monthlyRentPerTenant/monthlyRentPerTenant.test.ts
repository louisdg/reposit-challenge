import {
  calculateMonthlyRentPerTenantForProperty, CurrencyUnit
} from "./monthlyRentPerTenant";

describe('calculateMonthlyRentPerTenantForProperty', () => {
  it.each([
    {propertyId: "p_1007", expectedMonthlyRentPerTenant: 26020},
    {propertyId: "p_1015", currencyUnit: "PENCE", expectedMonthlyRentPerTenant: 260500},
    {propertyId: "p_1070", currencyUnit: "POUNDS", expectedMonthlyRentPerTenant: 309},
  ] as const)(
    "should calculate the monthly rent per tenant for property $propertyId in $currencyUnit",
    async ({propertyId, currencyUnit, expectedMonthlyRentPerTenant}) => {
      const monthlyRentPerTenant =
        await calculateMonthlyRentPerTenantForProperty(propertyId, currencyUnit);
      expect(monthlyRentPerTenant).toBeCloseTo(expectedMonthlyRentPerTenant, 0);
    },
  );

  it("should throw an error if no property has the given id", async () => {
    await expect(calculateMonthlyRentPerTenantForProperty("NON_EXISTENT_PROPERTY"))
      .rejects
      .toThrow("No property with id NON_EXISTENT_PROPERTY");
  });

  it("should throw an error if the given property has no tenants", async () => {
    await expect(calculateMonthlyRentPerTenantForProperty("p_1029"))
      .rejects
      .toThrow("No tenants found in property p_1029");
  });
});