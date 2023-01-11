// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { GetDocTI } from '~/DocRelated'

import type { Doc, DocBase, DocTI, IndexedDocTI } from '..'
import type { IDoc } from './IDoc'
import type { IndexedDoc } from './IndexedDoc'

describe('IndexedDoc', () => {
	it('type', () => {
		$Assert.is<IndexedDocTI, DocTI>()

		$Assert.is<DocTI, IndexedDocTI>() // less obvious - requires correct handling of index signatures

		// $Assert.is<IndexedDoc, IDoc>()

		// type ZebraTI = GetDocTI<'zebra'>
		// $Assert.is<Doc<ZebraTI>, IDoc>()

		// $Assert.is<ZebraTI, IndexedDocTI>()

		// $Assert.is<Doc<ZebraTI>['__voltiso'], DocBase<IndexedDocTI, 'outside'>>()
		// $Assert.is<Doc<ZebraTI>, IndexedDoc>()
	})
})
