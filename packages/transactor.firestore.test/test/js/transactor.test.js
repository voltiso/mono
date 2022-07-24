const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

describe('transactor', function () {
	it('throws on unknown options', async function () {
		expect.hasAssertions()
		// @ts-expect-error
		expect(() => createTransactor(firestore, { asd: 123 })).toThrow('unknown option')
	})
})
