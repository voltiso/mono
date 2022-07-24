Schema validation.

# Usage

```ts
import * as s from '@voltiso/schemar'

const mySchemable = {
	name: s.string,
	version: s.string.regex(/^[0-9]+\.[0-9]+\.[0-9]+$/), // simplified
	license: s.string.regex(/^[A-Z][0-9]$/).optional,
	dependencies: {
		'@voltiso/schemar': s.string.default('9.0.0'), // we need this!
	},
}

const result = s.schema(mySchemable).validate({ name: 'a', version: '1.0.0' })
// --> {
// 	name: 'a',
// 	version: '1.0.0',
// 	dependencies: {
// 		'@voltiso/schemar': '9.0.0',
// 	},
// }
```

## Infer TS Types

```ts
const mySchema = s.schema(mySchemable)

type MySchema = typeof mySchema.OutputType
// --> {
// 	name: string
// 	version: string
// 	license?: string
// 	dependencies: {
// 		'@voltiso/schemar': string
// 	}
// }

type MySchemaInput = typeof mySchema.InputType
// --> {
// 	name: string
// 	version: string
// 	license?: string
// 	dependencies?: {
// 		'@voltiso/schemar'?: string
// 	}
// }
```

## Bundlers / Tree-shaking

For proper bundler support, do not use the default import from `@voltiso/schemar`:

```ts
// import s from '@voltiso/schemar' // bad
import * as s from '@voltiso/schemar' // good - tree-shaking friendly (esbuild)

const mySchemable = {
	field: s.number,
}

const { isValid } = s.schema(mySchemable).tryValidate({ field: 123 })
// --> true
```
