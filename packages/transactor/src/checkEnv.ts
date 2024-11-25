// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { method } from './decorators'
import { Doc } from './Doc/Doc'
import { _inferMetadata } from './DocConstructor/_/inferMetadata'
import { TransactorError } from './error'

function checkStrictMode() {
	if (
		// eslint-disable-next-line no-useless-call, sonarjs/no-useless-call
		function (this: unknown) {
			return this
		}.call(null) !== null
	)
		throw new TransactorError(
			'checkStrictMode: unable to call function with `this === null` (missing "use strict"?)',
		)
}

function checkDecorators() {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!Symbol.metadata) {
		// eslint-disable-next-line no-console
		console.warn('`Symbol(Symbol.metadata)` not defined, adding a polyfill')
		// @ts-expect-error hack
		Symbol.metadata ??= Symbol('Symbol.metadata')
	}

	class C extends Doc {
		@method
		// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/class-methods-use-this
		fun() {}
	}

	_inferMetadata(C)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (!(C._.methods as any).fun) {
		throw new TransactorError('checkDecorators: decorators not working!')
	}
}

export function checkEnv(): void {
	checkStrictMode()
	checkDecorators()
}
