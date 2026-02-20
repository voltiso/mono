// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type MaybePromise<T> = T | Promise<T>

export type Script = MaybePromise<
	| Script.Literal
	| Script.Sequence
	| Script.WithParameters
	| Script.Nullish
	| Script.Parallel
	| Script.Race
>

//

export namespace Script {
	export type Nullish = null | undefined | '' | void

	export type WithParameters = (...args: string[]) => MaybePromise<Script>

	export interface Parallel {
		parallel: MaybePromise<Script>[]
	}

	export interface Race {
		race: MaybePromise<Script>[]
	}

	export type Sequence = MaybePromise<Script>[]

	export type Literal = string
}
