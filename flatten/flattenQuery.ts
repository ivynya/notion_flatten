
import {
  Flattened,
	PaginationResult
} from "../schemas/mod.ts";
import { flattenProperty } from "./mod.ts";

// Flattens a database query result
export function flattenQuery(res: PaginationResult): Flattened[] {
  return res.results.map((page) => flattenProperty(page));
}