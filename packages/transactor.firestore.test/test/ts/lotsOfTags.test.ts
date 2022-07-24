// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IndexedDoc, Ref, WeakDocRef } from '@voltiso/transactor'
import { createTransactor, Doc, method } from '@voltiso/transactor'
import * as transactorSchemas from '@voltiso/transactor/schemas'
import { Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore.js'

const db = createTransactor(firestore, firestoreModule)

class A extends Doc('a').public({ a: 1, b: transactorSchemas.ref<'b'>() }) {
	@method
	async setFriend(b: Ref<B>) {
		this.b = b
	}
}

class B extends Doc('b').public({ b: 2, c: transactorSchemas.ref<'c'>() }) {
	@method
	async setFriend(c: Ref<C>) {
		this.c = c
	}
}

class C extends Doc('c').public({ c: 3, d: transactorSchemas.ref<'d'>() }) {
	@method
	async setFriend(d: Ref<D>) {
		this.d = d
	}
}

class D extends Doc('d').public({ d: 4, e: transactorSchemas.ref<'e'>() }) {
	@method
	async setFriend(e: Ref<E>) {
		this.e = e
	}
}

class E extends Doc('e').public({
	d: s.number,
	f: transactorSchemas.ref<'f'>(),
}) {
	@method
	async setFriend(f: Ref<F>) {
		this.f = f
	}
}

class F extends Doc('f').public({
	d: s.number,
	g: transactorSchemas.ref<'g'>(),
}) {
	@method
	async setFriend(g: Ref<G>) {
		this.g = g
	}
}

class G extends Doc('g').public({
	d: s.number,
	a: transactorSchemas.ref<'a'>(),
}) {
	@method
	async setFriend(a: Ref<A>) {
		this.a = a
	}
}

declare module '@voltiso/transactor' {
	interface DocTypes {
		a: A
		b: B
		c: C
		d: D
		e: E
		f: F
		g: G
	}
}

describe('lotsOfTags', () => {
	it('works', () => {
		expect.assertions(0)

		const r = db('a', 'b', 'c', 'd')
		Assert.is<typeof r, WeakDocRef<IndexedDoc>>()
	})
})
