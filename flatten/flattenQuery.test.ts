
import { assertEquals } from "../deps.test.ts";
import { query, queryFlat } from "../test/query.test.ts";

import { flattenQuery } from "./flattenQuery.ts";

Deno.test({
	name: "flattenQuery",
	fn(): void {
		assertEquals(flattenQuery(query), queryFlat);
	}
});