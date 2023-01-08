// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare const _ProvidedNn: unique symbol
export interface WithProvidedNn<B extends boolean> {
	[_ProvidedNn]?: B
}

export type ProvidedNn<X extends {} = {}> = X & WithProvidedNn<true>
export type NoArgumentNn = WithProvidedNn<false>

// export type OptionalArgument<X> = Provided<X> | NoArgument

export type OptionalArgumentNn<X extends {}> = ProvidedNn<X> | NoArgumentNn
