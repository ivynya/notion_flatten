# notion-flatten
Flattens Notion API responses to be easier to work with in code. This is accomplished by removing type information (and therefore the assosciated nested objects created by the Notion API). As such, this module assumes the schema of the database in question is already known beforehand, making the type information acceptable to discard.

> WIP, flattened object schema subject to change in future versions.
>
> Probably not a good idea use this in a production scenario (for now). You have been warned.

## Usage Example

---

### Flattening a Database Query
```ts
import { flattenResult } from "https://deno.land/x/notion-flatten@v0.1.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/databases/:id/query`, ...);
const data = await res.json();

const flatData = flattenResult(data);
```

Pre-transformation data:
```json
{
	"object": "list",
	"results": [
		{
			"object": "page",
			"id": "2e01e904-febd-43a0-ad02-8eedb903a82c",
			"created_time": "2020-03-17T19:10:04.968Z",
			"last_edited_time": "2020-03-17T21:49:37.913Z",
			"parent": {
				"type": "database_id",
				"database_id": "897e5a76-ae52-4b48-9fdf-e71f5945d1af"
			},
			"archived": false,
			"url": "https://www.notion.so/2e01e904febd43a0ad028eedb903a82c",
			"properties": {
				"Cost of next trip": {
					"id": "R}wl",
					"type": "formula",
					"formula": {
						"type": "number",
						"number": 2
					}
				}
			}
		}
	],
	"has_more": false,
	"next_cursor": null
}
```

Post-transformation data:
```json
[
  {
    "Cost of next trip": { "type": "formula", "number": 2 },
    "id": "2e01e904-febd-43a0-ad02-8eedb903a82c",
    "created_time": "2020-03-17T19:10:04.968Z",
    "last_edited_time": "2020-03-17T21:49:37.913Z"
  }
]
```

### Flattening Database Meta Info
```ts
import { flattenDb } from "https://deno.land/x/notion-flatten@v0.1.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/databases/:id`, ...);
const data = await res.json();

const flatMetadata = flattenDb(data);
```

### Flattening a Page
```ts
import { flatten } from "https://deno.land/x/notion-flatten@v0.1.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/pages/:id`, ...);
const data = await res.json();

const flatPage = flattenDb(data);
```