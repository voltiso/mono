// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/unambiguous
declare module 'flow-remove-types' {
	// eslint-disable-next-line @typescript-eslint/method-signature-style
	declare const removeTypes: (code: string) => { toString(): string }
	export = removeTypes
}
