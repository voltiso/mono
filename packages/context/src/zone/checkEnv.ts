// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const zoneAwarePromiseKey = '__zone_symbol__uncaughtPromiseErrors'

const messagePrefix = '[@voltiso/context] Non-Node environment:'

function checkZonePresent() {
	if (typeof Zone === 'undefined') {
		throw new Error(`${messagePrefix} zone.js not imported`)
	}
}

function checkPromiseConstructor() {
	if (!(zoneAwarePromiseKey in Promise)) {
		throw new Error(
			`${messagePrefix} zone.js won't work: Promise does not seem to be ZoneAwarePromise (constructor name ${Promise.name})`,
		)
	}
}

function getImplicitPromiseConstructor() {
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

export function checkEnvUncached(): void {
	checkZonePresent()
	checkPromiseConstructor()
	checkImplicitPromiseConstructorName()
}

let isEnvChecked = false

export function checkEnv(): void {
	if (isEnvChecked) return
	isEnvChecked = true
	checkEnvUncached()
}
