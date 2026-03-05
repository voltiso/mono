// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export class NonGeneric {
	declare Type: string
}

export interface Generic<T> {
	get Type(): T
}

export type A = NonGeneric['Type']
export type A_ = /** @inline */ NonGeneric['Type']

export type G0<T> = Generic<T>['Type']
export type G0_<T> = /** @inline */ Generic<T>['Type']

export type G1 = Generic<string>['Type']
export type G1_ = /** @inline */ Generic<string>['Type']
