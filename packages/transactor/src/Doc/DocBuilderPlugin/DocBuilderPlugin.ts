// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsUnion } from '@voltiso/util'

import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { $$DocConstructor } from '~/DocConstructor'
import type { $$DocRelated, GetDocTag } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

export interface DocBuilderPlugin<R extends $$DocRelated = AnyDoc> {
	/**
	 * - Used to force using correct plugins with correct doc types
	 * - If T is not literal - plugin will be assignable anywhere
	 */
	readonly DocTag: IsUnion<GetDocTag<R>, any, GetDocTag<R>>

	readonly name?: keyof DocBuilderPluginResult<any>

	run(docConstructor: any): $$DocConstructor
}
