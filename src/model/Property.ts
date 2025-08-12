export const Regions = [
  "ENGLAND", "N.IRELAND", "SCOTLAND", "WALES",
] as const;
export type Region = (typeof Regions)[number];

export type Property = {
  id: string;
  address: string;
  postcode: string;
  monthlyRentPence: number;
  region: Region;
  capacity: number;
  tenancyEndDate: string;
}

