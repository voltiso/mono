// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

export type ScriptWithParameters = (
	...args: string[]
) => MaybePromise<Script | void>

export type ScriptLiteral = string

export type ScriptSequence = (Script | Promise<Script>)[]

export type Script = ScriptLiteral | ScriptSequence | ScriptWithParameters
