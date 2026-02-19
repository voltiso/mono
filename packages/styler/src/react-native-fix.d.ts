// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/unambiguous, sonarjs/no-built-in-override
declare interface Array<T> {
	/** Disable - may not exist in react-native / Android */
	at?: never
}

// eslint-disable-next-line sonarjs/no-built-in-override
declare interface String {
	/** Disable - may not exist in react-native / Android */
	replaceAll?: never
}
