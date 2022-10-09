// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsUnion } from '@voltiso/util'

import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { DocTag } from '~/DocTypes'

import type { IDocConstructor } from '../DocConstructor'
import type { DocTI } from '../DocTI'

export interface DocBuilderPluginLike<T extends DocTag> {
	readonly DocTag: T

	readonly name?: any

	// run(docConstructor: any): any
}

export interface DocBuilderPlugin<T extends DocTag = DocTag> {
	/**
	 * - Used to force using correct plugins with correct doc types
	 * - If T is not literal - plugin will be assignable anywhere
	 */
	readonly DocTag: IsUnion<T, any, T>

	readonly name?: keyof DocBuilderPluginResult<DocTI>

	run(docConstructor: any): IDocConstructor
}
