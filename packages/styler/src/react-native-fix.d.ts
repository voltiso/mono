// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/unambiguous
declare interface Array<T> {
	at?: never // disable - may not exist in react-native / Android
}

declare interface String {
	replaceAll?: never // disable - may not exist in react-native / Android
}
