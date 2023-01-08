// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { TransactorError } from './error'

function checkStrictMode() {
	if (
		// eslint-disable-next-line no-useless-call
		function (this: unknown) {
			return this
		}.call(null) !== null
	)
		throw new TransactorError(
			'checkStrictMode: unable to call function with `this === null` (missing "use strict"?)',
		)
}

export function checkEnv() {
	checkStrictMode()
}
