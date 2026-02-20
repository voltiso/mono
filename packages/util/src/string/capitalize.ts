// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function capitalize(str: string): string
export function capitalize(str: undefined): undefined
export function capitalize<S extends string | undefined>(
	str: S,
): S extends string ? string : S extends undefined ? undefined : never

export function capitalize(str: string | undefined): string | undefined {
	// biome-ignore lint/style/noNonNullAssertion: .
	if (str) return str[0]!.toUpperCase() + str.slice(1)

	return str
}
