// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const zoneAwarePromiseKey = '__zone_symbol__uncaughtPromiseErrors'

const messagePrefix = '[@voltiso/context] Non-Node environment:'

function checkPromiseConstructor() {
	if (!(zoneAwarePromiseKey in Promise)) {
		throw new Error(
			`${messagePrefix} zone.js won't work: Promise does not seem to be ZoneAwarePromise (constructor name ${Promise.name})`,
		)
	}
}

function getImplicitPromiseConstructor() {
	// eslint-disable-next-line no-empty-function
	return (async () => {})().constructor
}

function checkImplicitPromiseConstructorName() {
	const ImplicitPromise = getImplicitPromiseConstructor()

	if (!(zoneAwarePromiseKey in ImplicitPromise)) {
		throw new Error(
			`${messagePrefix} zone.js won't work: implicit Promise does not seem to be ZoneAwarePromise (constructor name ${ImplicitPromise.name})`,
		)
	}
}

//

export function checkEnvUncached() {
	checkPromiseConstructor()
	checkImplicitPromiseConstructorName()
}

let isEnvChecked = false

export function checkEnv() {
	if (isEnvChecked) return
	isEnvChecked = true
	checkEnvUncached()
}
