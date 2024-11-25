// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

function getLocationHref() {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return typeof window === 'undefined' ? undefined : window.location?.href
}

const initialLocationHref = getLocationHref()
let historyChanged = false

export function isNavigationBackForward(params?: {
	pathname?: string | undefined
}): boolean {
	if (historyChanged) return true

	const locationHref = params?.pathname ?? getLocationHref()

	// eslint-disable-next-line unicorn/no-negated-condition
	if (locationHref !== initialLocationHref) {
		historyChanged = true
		return true
	} else
		return (
			// eslint-disable-next-line sonarjs/deprecation, @typescript-eslint/no-deprecated
			window.performance.navigation.type ===
			// eslint-disable-next-line sonarjs/deprecation, @typescript-eslint/no-deprecated
			window.performance.navigation.TYPE_BACK_FORWARD
		)
}
