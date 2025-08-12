import {getStatusForProperty} from "./propertyStatus";

describe('getStatusForProperty', () => {
  it('should return PROPERTY_VACANT for a property with no tenants, regardless of tenancy end date', async () => {
    const propertyId = 'p_1029';
    const date = '2029-07-12';
    const propertyStatus = await getStatusForProperty(propertyId, date);
    expect(propertyStatus).toBe('PROPERTY_VACANT');
  });

  it('should return PROPERTY_OVERDUE for a property past tenancy end date with at least one tenant', async () => {
    const propertyId = 'p_1002';
    const date = '2027-08-05';
    const propertyStatus = await getStatusForProperty(propertyId, date);
    expect(propertyStatus).toBe('PROPERTY_OVERDUE');
  });

  it('should return PARTIALLY_VACANT for a property with some tenants but not full with tenancy still active', async () => {
    const propertyId = 'p_1022';
    const date = '2025-01-01';
    const propertyStatus = await getStatusForProperty(propertyId, date);
    expect(propertyStatus).toBe('PARTIALLY_VACANT');
  });

  it('should return PROPERTY_ACTIVE for a fully occupied property with tenancy still active', async () => {
    const propertyId = 'p_1004';
    const date = '2025-10-01';
    const propertyStatus = await getStatusForProperty(propertyId, date);
    expect(propertyStatus).toBe('PROPERTY_ACTIVE');
  });
});