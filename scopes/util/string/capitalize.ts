/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-magic-numbers */

export function capitalize(str: string): string
export function capitalize(str: undefined): undefined
export function capitalize<S extends string | undefined>(
	str: S
): S extends string ? string : S extends undefined ? undefined : never

export function capitalize(str: string | undefined): string | undefined {
	if (str) return str[0]!.toUpperCase() + str.slice(1)
	else return str
}
