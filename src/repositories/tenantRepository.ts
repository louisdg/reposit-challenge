import {TENANTS_FILE_PATH} from "../config/filePaths";
import parseCsv from "../utils/parseCsv";
import {Tenant} from "../model/Tenant";

export async function getTenants() {
  return parseCsv<Tenant>(TENANTS_FILE_PATH);
}