// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface PlainObject {
	[x: number]: never
}

//

export type AlsoAccept<X> = X extends {} ? X & {} : X

//

export type DeepMutable_<T> = {
	-readonly [k in keyof T]: DeepMutable_<T[k]>
}

//

export type _<T> = [{ [k in keyof T]: T[k] }][0]

export type Merge2_<A, B> = _<Omit<A, keyof B> & B>
