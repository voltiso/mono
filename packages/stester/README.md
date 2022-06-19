# `@voltiso/util.stester`

Static Tester - TS Type assertions.

## `Assert.is<A, B>()`

```ts
Assert.is<123, number>()
```

## `Assert<A, ... >()`

```ts
import { IsIdentical } from '@voltiso/util.type'

Assert<
	IsIdentical<123, 123>
	//
>()

Assert<
	IsIdentical<1, 1>,
	IsEqual<2, 2>
	//
>()
```

## BDD

```ts
Assert(
	Is<123>().subtypeOf<number>()
	//
)

Assert(
	Is<1>()<number>(),
	Is<'a'>().strictSubtypeOf<string>()
	//
)
```
