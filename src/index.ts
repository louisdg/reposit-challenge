import {calculateAverageRentOfPropertiesByRegion} from "./averageRent/averageRent";
import {Regions} from "./model/Property";
import {formatCurrency} from "./utils/currencyFormatting";

async function requirement1() {
  await Promise.all(
    Regions.map(async (region) => {
      try {
        const avgRent = await calculateAverageRentOfPropertiesByRegion(region);
        console.log(`Average rent in ${region} is ${formatCurrency(avgRent)}`);
      } catch (error) {
        console.error(`Error calculating average rent: ${(error as Error).message}`);
      }
    })
  );
}

async function main() {
  await requirement1();
}

main().catch((error) => {
  console.error(error);
});