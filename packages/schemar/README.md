Schema validation.

# Usage

```ts
import * as s from '@voltiso/schemar'

const myShape = {
	name: s.string,
	version: s.string.regex(/^[0-9]+\.[0-9]+\.[0-9]+$/), // simplified
	license: s.string.regex(/^[A-Z][0-9]$/).optional,
	dependencies: {
		'@voltiso/schemar': s.string.default('9.0.0'), // we need this!
	},
}

const value = s.schema(myShape).validate({ name: 'a', version: '1.0.0' })
// --> {
//  	name: 'a',
//  	version: '1.0.0',
//  	dependencies: {
//      '@voltiso/schemar': '9.0.0',
// 	 },
// }
```

## Infer TS Types

```ts
const mySchema = s.schema(myShape)

type MySchema = typeof mySchema.Output
// --> {
// 	 name: string
// 	 version: string
// 	 license?: string
// 	 dependencies: {
// 	 	 '@voltiso/schemar': string
// 	 }
// }

type MySchemaInput = typeof mySchema.Input
// --> {
//   name: string;
//   version: string;
//   license?: string | undefined;
//   dependencies?: {
//     "@voltiso/schemar"?: string | undefined;
//   } | undefined;
// }
```

## `exec` - get full validation information and issues list

```ts
import * as s from '@voltiso/schemar'

const myShape = {
	field: s.number,
}

const result = s.schema(myShape).exec({ field: 123 })
// --> {
// 	 isValid: true,
// 	 issues: [],
// 	 value: { field: 123 },
// }
```
