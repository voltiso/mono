// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocumentData, Primitive } from './DocumentData'
import type { FieldValue } from './FieldValue'

export type UpdateDataNested = Primitive | FieldValue | DocumentData
export type UpdateData = Record<string, UpdateDataNested>
