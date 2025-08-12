import {getProperties} from "./propertyRepository";
import assert from "node:assert";

describe("PropertyRepository", () => {
  it("should load and parse properties from CSV", async () => {
    const properties = await getProperties();
    expect(properties).toBeInstanceOf(Array);
    expect(properties.length).toBe(100);
    expect(properties[0]).toHaveProperty("id");
    expect(properties[0]).toHaveProperty("address");
    expect(properties[0]).toHaveProperty("postcode");
    expect(properties[0]).toHaveProperty("monthlyRentPence");
    expect(properties[0]).toHaveProperty("region");
    expect(properties[0]).toHaveProperty("capacity")
    expect(properties[0]).toHaveProperty("tenancyEndDate");
  });

  it("should contain a known property with expected values", async () => {
    const properties = await getProperties();
    const property = properties.find(property => property.id === "p_1042");
    expect(property).toBeDefined();
    assert(property);
    expect(property.address).toBe("175 Pine Crescent");
    expect(property.postcode).toBe("EH16 6NZ");
    expect(property.monthlyRentPence).toBe(119800);
    expect(property.region).toBe("ENGLAND");
    expect(property.capacity).toBe(1);
    expect(property.tenancyEndDate).toBe("2025-12-23");
  });

  it("should not contain a non-existent property", async () => {
    const properties = await getProperties();
    const property = properties.find(property => property.id === "p_9999");
    expect(property).toBeUndefined();
  });
});