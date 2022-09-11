// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Similar to the standard `ReturnType` - no type parameter constraint */
export type ReturnType_<T> = T extends (...args: any) => infer R ? R : never
