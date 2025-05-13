// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { DocTI, IndexedDocTI } from '..'

describe('IndexedDoc', () => {
	it('type', () => {
		$Assert.is<IndexedDocTI, DocTI>()

		// ! TODO
		// $Assert.is<DocTI, IndexedDocTI>() // less obvious - requires correct handling of index signatures

		// $Assert.is<IndexedDoc, IDoc>()

		// type ZebraTI = GetDocTI<'zebra'>
		// $Assert.is<Doc<ZebraTI>, IDoc>()

		// $Assert.is<ZebraTI, IndexedDocTI>()

		// $Assert.is<Doc<ZebraTI>['__voltiso'], DocBase<IndexedDocTI, 'outside'>>()
		// $Assert.is<Doc<ZebraTI>, IndexedDoc>()
	})
})
