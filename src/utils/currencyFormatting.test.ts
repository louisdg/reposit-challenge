import { formatCurrency } from "./currencyFormatting";

describe("formatCurrency", () => {
  it("should return null if monetaryValueInPence is undefined", () => {
    expect(formatCurrency(undefined)).toBeNull();
  });

  it("should format a simple currency value in pence", () => {
    expect(formatCurrency(12345)).toBe("£123.45");
  });

  it("should handle zero pence correctly", () => {
    expect(formatCurrency(0)).toBe("£0.00");
  });

  it("should round down when more than two fractional pence", () => {
    expect(formatCurrency(12340.3)).toBe("£123.40");
  });

  it("should round up when more than two fractional pence", () => {
    expect(formatCurrency(12340.8)).toBe("£123.41");
  });

  it("should handle large currency values", () => {
    expect(formatCurrency(10000000)).toBe("£100,000.00");
  });

  it("should format negative currency values", () => {
    expect(formatCurrency(-12345)).toBe("-£123.45");
  });
});
