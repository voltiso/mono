// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Flatten<T> = [{ [k in keyof T]: T[k] }][0]

/** @inline */ export type InlineFlatten<T> = [{ [k in keyof T]: T[k] }][0]

export type A = { a: 1 }
export type B = { b: 1 }

export type Normal = Flatten<A & B>
export type Inlined = InlineFlatten<A & B>

export type UnableToInline<B> = InlineFlatten<A & B>
