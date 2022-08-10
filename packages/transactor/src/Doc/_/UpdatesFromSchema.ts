// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType, InferableObject } from '@voltiso/schemar'

import type { DeleteIt, ReplaceIt } from '~/it'

import type { UpdatesFromData } from './UpdatesFromData'

export type UpdatesFromSchema<Fields extends InferableObject> =
	| UpdatesFromData<GetType<Fields>>
	| DeleteIt

export declare namespace UpdatesFromSchema {
	export type Update<Fields extends InferableObject> = UpdatesFromData.Update<
		GetType<Fields>
	>

	export type Replace<Fields extends InferableObject> = ReplaceIt<
		GetType<Fields>
	>

	export type Delete = DeleteIt
}
