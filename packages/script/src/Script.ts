// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type MaybePromise<T> = T | Promise<T>

export type Script = MaybePromise<
	Script.Literal | Script.Sequence | Script.WithParameters | Script.Nullish
>

//

export namespace Script {
	export type Nullish = null | undefined | '' | void

	export type WithParameters = (...args: string[]) => Script

	export interface Parallel {
		parallel: Script[]
	}

	export interface Race {
		race: Script[]
	}

	export type Sequence = Script[]

	export type Literal = string
}
