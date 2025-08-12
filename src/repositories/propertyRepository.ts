import {PROPERTIES_FILE_PATH} from "../config/filePaths";
import parseCsv from "../utils/parseCsv";
import {Property} from "../model/Property";

export async function getProperties() {
  return parseCsv<Property>(PROPERTIES_FILE_PATH);
}