// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface ValidateOptions {
	fix: boolean
}

export const defaultValidateOptions = {
	fix: true as const,
}

export type DefaultValidateOptions = typeof defaultValidateOptions
