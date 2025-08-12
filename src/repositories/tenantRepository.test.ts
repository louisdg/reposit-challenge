import {getTenants} from "./tenantRepository";
import assert from "node:assert";

describe("TenantRepository", () => {
  it("should load and parse tenants from CSV", async () => {
    const tenants = await getTenants();
    expect(tenants).toBeInstanceOf(Array);
    expect(tenants.length).toBe(250);
    expect(tenants[0]).toHaveProperty("id");
    expect(tenants[0]).toHaveProperty("name");
    expect(tenants[0]).toHaveProperty("propertyId");
  });

  it("should contain a known tenant with expected values", async () => {
    const tenants = await getTenants();
    const tenant = tenants.find(tenant => tenant.id === "t_5106");
    expect(tenant).toBeDefined();
    assert(tenant);
    expect(tenant.name).toBe("Victoria Williams");
    expect(tenant.propertyId).toBe("p_1042");
  });

  it("should not contain a non-existent tenant", async () => {
    const tenants = await getTenants();
    const tenant = tenants.find(tenant => tenant.id === "t_9999");
    expect(tenant).toBeUndefined();
  });
});