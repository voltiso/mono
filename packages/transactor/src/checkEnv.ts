// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { TransactorError } from './error'

// // eslint-disable-next-line import/no-unassigned-import
// import 'zone.js'

// function promiseConstructorName() {
// 	return Promise.name
// }

const zoneAwarePromiseKey = '__zone_symbol__uncaughtPromiseErrors'

function checkPromiseConstructor() {
	if (!(zoneAwarePromiseKey in Promise)) {
		throw new TransactorError(
			`zone.js not imported correctly: Promise does not seem to be ZoneAwarePromise (constructor name ${Promise.name})`,
		)
	}
	// const name = promiseConstructorName()

	// console.log(`[${moduleName}] Promise.name === ${name}`)

	// if (name !== 'ZoneAwarePromise') {
	// 	throw new TransactorError(
	// 		`zone.js not imported correctly: Promise.name === ${name}`,
	// 	)
	// }
}

function getImplicitPromiseConstructor() {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return (async () => {})().constructor
}

function checkImplicitPromiseConstructorName() {
	const ImplicitPromise = getImplicitPromiseConstructor()

	if (!(zoneAwarePromiseKey in ImplicitPromise)) {
		throw new TransactorError(
			`zone.js not imported correctly: implicit Promise does not seem to be ZoneAwarePromise (constructor name ${ImplicitPromise.name})`,
		)
	}

	// console.log(`[${moduleName}] implicit Promise constructor name: ${name}`)

	// if (name !== 'ZoneAwarePromise') {
	// 	throw new TransactorError(
	// 		`[zone.js not imported correctly: implicit Promise constructor name === ${name}. Make sure to transpile to ES2016 or earlier.`,
	// 	)
	// }
}

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
	checkPromiseConstructor()
	checkImplicitPromiseConstructorName()
}
