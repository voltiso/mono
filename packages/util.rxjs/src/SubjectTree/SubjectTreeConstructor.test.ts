import { $Assert, IsIdentical } from '@voltiso/util'
import { RequiredSubjectTree, SubjectTree } from './SubjectTree'

describe('SubjectTreeConstructor', () => {
	it('type', () => {
		const a = new SubjectTree({ a: 1 })
		$Assert<IsIdentical<typeof a, RequiredSubjectTree<{ a: number }>>>()
	})
})
