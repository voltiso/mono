// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import { CustomUnknownFunctionImpl } from '../unknownFunction/CustomUnknownFunctionImpl'
import { CustomFunctionImpl } from './CustomFunctionImpl'
import { defaultFunctionOptions } from './defaultFunctionOptions'
import type { FunctionOptions } from './FunctionOptions'

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

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	[CALL](...args: unknown[]): never {
		return new CustomUnknownFunctionImpl(...(args as [any])) as never
	}
}
