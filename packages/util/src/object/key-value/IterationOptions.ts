// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface IterationOptions {
	includeSymbols: boolean
	includeNonEnumerable: boolean
}

export const defaultIterationOptions = {
	includeSymbols: false as const,
	includeNonEnumerable: false as const,
}

export type DefaultIterationOptions = typeof defaultIterationOptions
