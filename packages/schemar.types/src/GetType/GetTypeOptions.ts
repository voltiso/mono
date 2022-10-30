// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface GetTypeOptions {
	kind: 'in' | 'out'
	isPlain: boolean
}

export type DefaultGetTypeOptions = {
	kind: 'out'
	isPlain: false
}
