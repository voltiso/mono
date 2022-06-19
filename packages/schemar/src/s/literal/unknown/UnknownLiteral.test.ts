import { Assert } from '@voltiso/ts-util/bdd'
import { CustomUnknownLiteral } from './CustomUnknownLiteral'
import { IUnknownLiteral } from './IUnknownLiteral'
import { UnknownLiteralOptions } from './_/UnknownLiteralOptions'

describe('UnknownLiteral', () => {
	it('generic', <O extends UnknownLiteralOptions>() => {
		expect.assertions(0)

		Assert.is<IUnknownLiteral<O>, IUnknownLiteral>()
		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral<O>>()
		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>()
	})
})
