// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitSignatures } from '@voltiso/util'

import type { IDoc } from './Doc'

export interface DocTypes {
	untagged: IDoc
	[k: string]: IDoc
}

export type DocTag = keyof OmitSignatures<DocTypes>
// export type DocTag = keyof DocTypes

// export type DocTag = {
// 	[k in DocTag_]: DocTypes[k] extends DocU ? k : never
// }[DocTag_]

export type DocType = Extract<DocTypes[keyof DocTypes], IDoc>

export type DocFromTag<Tag extends DocTag> = DocTypes[Tag] // extends DocU ? DocTypes[Tag] : never

// export type GetDocTag<D extends DocU | DocTIU> = D extends DocU
// 	? D[DTI]['tag']
// 	: D extends DocTIU
// 	? D['tag']
// 	: undefined
