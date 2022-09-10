// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Light-weight runtime assert */
export function assert(
	condition: unknown,
	message?: string | undefined,
): asserts condition {
	if (!condition)
		throw new Error(
			message ? `Assertion Failed: ${message}` : `Assertion Failed`,
		)
}
