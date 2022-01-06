
import { assertEquals } from "../deps.test.ts";
import { database, databaseFlat } from "../test/database.test.ts";

import { flattenDatabase } from "./flattenDatabase.ts";

Deno.test({
	name: "flattenDatabase",
	fn(): void {
		assertEquals(flattenDatabase(database), databaseFlat);
	}
});