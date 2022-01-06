# notion-flatten

> ⚠️ WIP, flattened object schema subject to change in future versions.
>
> ⚠️ Probably not a good idea use this in a production scenario (for now). You have been warned.

Flattens Notion API responses to be easier to work. This is accomplished by removing type and other information (and therefore the assosciated nested objects created by the Notion API).

This module is best used if type information is known beforehand, but if type information is needed, a flattened database schema can be generated using `flattenDatabase` containing all DB properties and type information.

## Usage Examples

### Pre & Post Transformation Data
Examples of non-flattened and flattened data are available in the [test folder](./test) of this repository. Each file contains raw API data as well as the flattened version of that data, according to the appropriate transform function.

### Flattening a Database Query
```ts
import { flattenQuery } from "https://deno.land/x/notion-flatten@v0.2.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/databases/:id/query`, ...);
const data = await res.json();

const flatData = flattenQuery(data);
```

### Flattening Database Meta Info
```ts
import { flattenDatabase } from "https://deno.land/x/notion-flatten@v0.2.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/databases/:id`, ...);
const data = await res.json();

const flatMetadata = flattenDatabase(data);
```

### Flattening a Page
```ts
import { flattenPage } from "https://deno.land/x/notion-flatten@v0.2.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/pages/:id`, ...);
const data = await res.json();

const flatPage = flattenPage(data);
```

### Flattening a Property
```ts
import { flattenProperty } from "https://deno.land/x/notion-flatten@v0.2.0/mod.ts";

const res = await fetch(`https://api.notion.com/v1/pages/:id`, ...);
const data = await res.json();

const flatPage = flattenProperty(data);
```