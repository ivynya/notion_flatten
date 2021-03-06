
import {
  Flattenable,
  Flattened
} from "../schemas/mod.ts";
import { flattenProperty } from "./mod.ts";

// Flattens database meta information
export function flattenDatabase(db: Flattenable): Flattened {
  // Transpose properties to new object
  const flat: Flattened = {
    title: flattenProperty((db as any).title),
    properties: db.properties,
    id: db.id,
    created_time: db.created_time,
    last_edited_time: db.last_edited_time
  };
  // Set properties to their type directly
  for (const key of Object.keys(flat.properties))
    flat.properties[key] = flat.properties[key].type;
  // Return flattened object
  return flat;
}
