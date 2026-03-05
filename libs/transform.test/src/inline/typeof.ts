// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AnyDoc } from './_/external-stuff'
import { BothTypeAndValue, importedValue } from './_/external-stuff'

export type A = /** @inline */ AnyDoc

const IN_SCOPE = Symbol('in scope')

type InScopeProxy = typeof IN_SCOPE

export type InScope = /** @inline */ InScopeProxy

export type InScope2 = /** @inline */ typeof importedValue

export type InScope3 = /** @inline */ typeof BothTypeAndValue
