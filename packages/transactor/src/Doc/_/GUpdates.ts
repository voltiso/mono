// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType, InferableObject } from '@voltiso/schemar'

import type { DeleteIt, ReplaceIt } from '~/it'

import type { UpdatesFromData, UpdatesFromData_Update } from './UpdatesFromData'

export type GUpdates<Fields extends InferableObject> =
	| UpdatesFromData<GetType<Fields>>
	| DeleteIt

export type GUpdates_Update<Fields extends InferableObject> =
	UpdatesFromData_Update<GetType<Fields>>

export type GUpdates_Replace<Fields extends InferableObject> = ReplaceIt<
	GetType<Fields>
>

export type GUpdates_Delete = DeleteIt
