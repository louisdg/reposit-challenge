import fs from "fs";
import { parse } from "csv-parse";

export default async function parseCsv<
  T extends { [header: string]: string | number },
>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        reject(err);
      }

      parse(
        buffer,
        {
          columns: true,
          trim: true,
          cast: true,
        },
        function (csvError, rows: T[]) {
          if (csvError) {
            reject(csvError);
          }

          resolve(rows);
        },
      );
    });
  });
}
