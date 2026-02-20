// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Doc } from './Doc/Doc'
import { _inferMetadata } from './DocConstructor/_/inferMetadata'
import { _setDecoratorDetection, method } from './decorators'
import { TransactorError } from './error'

function checkStrictMode() {
	if (
		function (this: unknown) {
			return this
		}.call(null) !== null
	)
		throw new TransactorError(
			'checkStrictMode: unable to call function with `this === null` (missing "use strict"?)',
		)
}

function checkDecorators() {
	if (!Symbol.metadata) {
		console.warn(
			'⚠️ @voltiso/transactor: checkDecorators: `Symbol(Symbol.metadata)` not defined, adding a polyfill',
		)
		// @ts-expect-error hack
		Symbol.metadata ??= Symbol.for('Symbol.metadata') // consistent with other polyfills
	}

	_setDecoratorDetection(false)

	class C extends Doc {
		@method
		fun() {}
	}

	_setDecoratorDetection(true)

	_inferMetadata(C)

	if (!(C._.methods as any).fun) {
		throw new TransactorError('checkDecorators: decorators not working!')
	}
}

export function checkEnv(): void {
	checkStrictMode()
	checkDecorators()
}
