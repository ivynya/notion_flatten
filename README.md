# notion-flatten
Flattens Notion API responses to be easier to work with in code. This is accomplished by removing type and other information (and therefore the assosciated nested objects created by the Notion API). As such, this module assumes the schema of the database in question is already known beforehand, making the type information acceptable to discard.

> ⚠️ WIP, flattened object schema subject to change in future versions.
>
> ⚠️ Probably not a good idea use this in a production scenario (for now). You have been warned.

## Usage Examples

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

## (Incomplete) Transformation Key
Scroll down past this table for a complete transformation example, in a raw JSON form.

 <table>
  <tr>
    <th>Property Type</th>
    <th>Original Data</th>
    <th>Flattened Data</th>
  </tr>
  <tr>
    <td>Text</td>
    <td>
 <pre>
"ST-RichText": {
  "id": "a%7CZZ",
  "type": "rich_text",
  "rich_text": [{...}, {...}, {...}]
}
</pre>
    </td>
    <td>
<pre>
"ST-RichText": "Concatenated Plaintext"
</pre>
    </td>
  </tr>
  <tr>
    <td>Multi-Select</td>
    <td>
<pre>
"ST-Multiselect": {
  "id": "b%5BsI",
  "type": "multi_select",
  "multi_select": [{...}, {...}]
}
</pre>
    </td>
    <td>
<pre>
"ST-Multiselect": [{...}, {...}],
</pre>
    </td>
  </tr>
  <tr>
    <td>Select</td>
    <td>
<pre>
"ST-Select": {
  "id": "Q%3C%40%7C",
  "type": "select",
  "select": {...}
}
</pre>
    </td>
    <td>
<pre>
"ST-Select": {...}
</pre>
    </td>
  </tr>
  <tr>
    <td>Number</td>
    <td>
<pre>
"ST-Number": {
  "id": "gAsw",
  "type": "number",
  "number": 0
}
</pre>
    </td>
    <td>
<pre>
"ST-Number": 0
</pre>
    </td>
  </tr>
  <tr>
    <td>Date</td>
    <td>
<pre>
"ST-Date": {
  "id": "%5Eo%3CB",
  "type": "date",
  "date": {...}
}
</pre>
    </td>
    <td>
<pre>
"ST-Date": {...}
</pre>
    </td>
  </tr>
</table> 

## Example Transformation with All Datatypes
Pre-transform:
```json
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "edc0e5b6-12c6-404e-8630-8970a7bb96a5",
      "created_time": "2021-12-23T06:17:00Z",
      "last_edited_time": "2021-12-23T06:21:00Z",
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "1ea1c3f9-070e-4e6f-bbfe-2cc5cd8a1416"
      },
      "archived": false,
      "properties": {
        "ST-File": {
          "id": "N%7CET",
          "type": "files",
          "files": [
            {
              "name": "bookmark.png",
              "type": "file",
              "file": {
                "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/...",
                "expiry_time": "2021-12-23T07:38:51.893Z"
              }
            }
          ]
        },
        "ST-Formula": {
          "id": "OM_S",
          "type": "formula",
          "formula": {
            "type": "number",
            "number": 2
          }
        },
        "ST-Select": {
          "id": "Q%3C%40%7C",
          "type": "select",
          "select": {
            "id": "cc106d43-ab70-4990-8b12-2b8a3a3bf63e",
            "name": "C",
            "color": "orange"
          }
        },
        "ST-Phone": {
          "id": "S%7D%60T",
          "type": "phone_number",
          "phone_number": "+15555555555"
        },
        "ST-Checkbox": {
          "id": "UZHO",
          "type": "checkbox",
          "checkbox": false
        },
        "ST-Date": {
          "id": "%5Eo%3CB",
          "type": "date",
          "date": {
            "start": "2022-08-03",
            "end": null,
            "time_zone": null
          }
        },
        "ST-RichText": {
          "id": "a%7CZZ",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Text ",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Text ",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": "Rich",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Rich",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": "text",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "text",
              "href": null
            }
          ]
        },
        "ST-Multiselect": {
          "id": "b%5BsI",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "206bbaaa-470e-45d8-b7c0-06eda7cc4003",
              "name": "A",
              "color": "gray"
            },
            {
              "id": "793a5d1f-54f2-47db-bdf0-ae3ab7ae5b7d",
              "name": "B",
              "color": "pink"
            }
          ]
        },
        "ST-Number": {
          "id": "gAsw",
          "type": "number",
          "number": 0
        },
        "ST-Email": {
          "id": "jb%3B%3A",
          "type": "email",
          "email": "hello@maintained.cc"
        },
        "ST-Person": {
          "id": "loen",
          "type": "people",
          "people": [
            {
              "object": "user",
              "id": "95d40abc-364a-49f4-8fe7-1be4c55410da"
            }
          ]
        },
        "ST-URL": {
          "id": "uQNA",
          "type": "url",
          "url": "https://wisdomduck.sdbagel.com/"
        },
        "ST-Media": {
          "id": "uuEG",
          "type": "files",
          "files": [
            {
              "name": "Named Embed Link",
              "type": "external",
              "external": {
                "url": "https://www.youtube.com/watch?v=Rk1MYMPDx3s"
              }
            },
            {
              "name": "https://wisdomduck.sdbagel.com/",
              "type": "external",
              "external": {
                "url": "https://wisdomduck.sdbagel.com/"
              }
            }
          ]
        },
        "ST-Title": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "The Title",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "The Title",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/The-Title-edc0e5b612c6404e86308970a7bb96a5"
    }
  ],
  "has_more": false,
  "next_cursor": null
}
```
Post-transform:
```js
[
  {
    object: "page",
    id: "edc0e5b6-12c6-404e-8630-8970a7bb96a5",
    created_time: "2021-12-23T06:17:00Z",
    last_edited_time: "2021-12-23T06:21:00Z",
    cover: null,
    icon: null,
    parent: "1ea1c3f9-070e-4e6f-bbfe-2cc5cd8a1416",
    archived: false,
    url: "https://www.notion.so/The-Title-edc0e5b612c6404e86308970a7bb96a5",
    "ST-File": [
      {
        type: "file",
        name: "bookmark.png",
        url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5f24ae9a-0387-437c-8edd-d04a2e47f38e/boo...",
        expiry_time: "2021-12-23T07:38:51.893Z"
      }
    ],
    "ST-Formula": 2,
    "ST-Select": { id: "cc106d43-ab70-4990-8b12-2b8a3a3bf63e", name: "C", color: "orange" },
    "ST-Phone": "+15555555555",
    "ST-Checkbox": false,
    "ST-Date": { start: "2022-08-03", end: null, time_zone: null },
    "ST-RichText": "Text Richtext",
    "ST-Multiselect": [
      { id: "206bbaaa-470e-45d8-b7c0-06eda7cc4003", name: "A", color: "gray" },
      { id: "793a5d1f-54f2-47db-bdf0-ae3ab7ae5b7d", name: "B", color: "pink" }
    ],
    "ST-Number": 0,
    "ST-Email": "hello@maintained.cc",
    "ST-Person": [ { object: "user", id: "95d40abc-364a-49f4-8fe7-1be4c55410da" } ],
    "ST-URL": "https://wisdomduck.sdbagel.com/",
    "ST-Media": [
      {
        type: "file",
        name: "Named Embed Link",
        url: "https://www.youtube.com/watch?v=Rk1MYMPDx3s"
      },
      {
        type: "file",
        name: "https://wisdomduck.sdbagel.com/",
        url: "https://wisdomduck.sdbagel.com/"
      }
    ],
    "ST-Title": "The Title"
  }
]
```
