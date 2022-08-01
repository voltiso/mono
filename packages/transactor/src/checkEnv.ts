// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/no-unassigned-import
import 'zone.js'

const moduleName = '@voltiso/transactor'

function promiseConstructorName() {
	return Promise.name
}

function checkPromiseConstructorName() {
	const name = promiseConstructorName()
	// console.log(`[${moduleName}] Promise.name === ${name}`)

	if (name !== 'ZoneAwarePromise') {
		throw new Error(
			`[${moduleName}] zone.js not imported correctly: Promise.name === ${name}`,
		)
	}
}

function implicitPromiseConstructorName() {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return (async () => {})().constructor.name
}

function checkImplicitPromiseConstructorName() {
	const name = implicitPromiseConstructorName()

	// console.log(`[${moduleName}] implicit Promise constructor name: ${name}`)

	if (name !== 'ZoneAwarePromise') {
		throw new Error(
			`[${moduleName}] zone.js not imported correctly: implicit Promise constructor name === ${name}. Make sure to transpile to ES2016 or earlier.`,
		)
	}
}

function checkStrictMode() {
	if (
		// eslint-disable-next-line no-useless-call
		function (this: unknown) {
			return this
		}.call(null) !== null
	)
		throw new Error(
			'[@voltiso/transactor] checkStrictMode: unable to call function with `this === null` (missing "use strict"?)',
		)
}

export function checkEnv() {
	checkStrictMode()
	checkPromiseConstructorName()
	checkImplicitPromiseConstructorName()
}
