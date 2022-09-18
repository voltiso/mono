// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Light-weight runtime assert */
export function assert(
	condition: unknown,
	message?: string | undefined,
): asserts condition {
	if (!condition) {
		const finalMessage = message
			? `[@voltiso/util] assert(${condition as string}, '${message}') failed`
			: `[@voltiso/util] assert(${condition as string}) failed`
		throw new Error(finalMessage)
	}
}
