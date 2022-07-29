// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// WARNING: this file has to be imported directly
// (mitigating problems with cyclic dependencies)

export const EXTENDS = Symbol('EXTENDS')
export type EXTENDS = typeof EXTENDS

export const OPTIONS = Symbol('OPTIONS')
export type OPTIONS = typeof OPTIONS

export const PARTIAL_OPTIONS = Symbol('PARTIAL_OPTIONS')
export type PARTIAL_OPTIONS = typeof PARTIAL_OPTIONS

export const DEFAULT_OPTIONS = Symbol('DEFAULT_OPTIONS')
export type DEFAULT_OPTIONS = typeof DEFAULT_OPTIONS

export const BASE_OPTIONS = Symbol('BASE_OPTIONS')
export type BASE_OPTIONS = typeof BASE_OPTIONS
