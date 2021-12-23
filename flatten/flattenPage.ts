
import {
  Flattenable,
  Flattened
} from "../schemas/mod.ts";
import { flattenProperty } from "./mod.ts";

// Flattens an individual page's properties
export function flattenPage(page: Flattenable): Flattened {
	const flat: Flattened = page;
	// Flatten properties of the parent object
	for (const key of Object.keys(page))
		flat[key] = flattenProperty(flat[key]);
  // Fold properties into parent object recursively
  for (const key of Object.keys(page.properties))
    flat[key] = flattenProperty(page.properties[key]);
	delete flat.properties;
  // Return flattened object
  return flat;
}