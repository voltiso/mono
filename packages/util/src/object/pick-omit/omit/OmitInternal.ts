// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ExtractInternal<K> = K extends `_${string}` ? K : never
export type ExcludeInternal<K> = K extends `_${string}` ? never : K

export type PickInternal<T> = Pick<T, ExtractInternal<keyof T>>
export type OmitInternal<T> = Omit<T, ExtractInternal<keyof T>>
