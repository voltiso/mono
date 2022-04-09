/* eslint-disable jest/require-hook */
import { Assert, Is } from './Assert'

//
;<U extends number>() => {
	Assert(
		Is<123>().subtypeOf<number>(),
		Is('123' as const).not.subtypeOf<number>(),
		Is<number>().not.strictSubtypeOf<number>(),
		Is(123 as const).strictSubtypeOf<number>(),
		//
		Is<U>().subtypeOf<number>()
		// Sometimes(Type<123>().is.subtypeOf<U>()),
		// Sometimes(Type<'123'>().is.subtypeOf<U>())
	)

	Assert.isSubtype<123, number>()

	// @ts-expect-error is not subtype - error
	Assert.isSubtype<'123', number>()

	Assert.isSupertype<number, 123>()

	// @ts-expect-error is not subtype - error
	Assert.isSupertype<number, '123'>()
}
