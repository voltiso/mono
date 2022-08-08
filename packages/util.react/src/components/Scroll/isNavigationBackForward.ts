
function getLocationHref() {
	return typeof window !== 'undefined' ? window.location.href : undefined
}

const initialLocationHref = getLocationHref()
let historyChanged = false

export function isNavigationBackForward() {
	if (historyChanged) return true

	const locationHref = getLocationHref()

	if (locationHref !== initialLocationHref) {
		historyChanged = true
		return true
	} else
		return (
			// eslint-disable-next-line etc/no-deprecated
			window.performance.navigation.type ===
			// eslint-disable-next-line etc/no-deprecated
			window.performance.navigation.TYPE_BACK_FORWARD
		)
}
