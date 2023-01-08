// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

export type Script = MaybePromise<
	ScriptLiteral | ScriptSequence | ScriptWithParameters | NoScript
>

export type ScriptLiteral = string

export type ScriptWithParameters = (...args: string[]) => Script

export type NoScript = null | undefined | '' | void

export type ScriptSequence = Script[]
