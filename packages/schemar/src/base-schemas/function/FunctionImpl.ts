// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FunctionOptions } from '@voltiso/schemar.types'
import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import { CustomUnknownFunctionImpl } from '.'
import { CustomFunctionImpl } from './CustomFunctionImpl'
import { defaultFunctionOptions } from './defaultFunctionOptions'

export class FunctionImpl<
	Options extends Partial<FunctionOptions>,
> extends lazyConstructor(() => CustomFunctionImpl)<never> {
	//
	constructor(options: Options) {
		super({
			...defaultFunctionOptions,
			...options,
		} as never)

		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL](...args: unknown[]): never {
		return new CustomUnknownFunctionImpl(...(args as [any])) as never
	}
}
