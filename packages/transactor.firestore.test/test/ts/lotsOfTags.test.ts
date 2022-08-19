// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IndexedDoc, StrongRef, WeakDocRef } from '@voltiso/transactor'
import { sStrongRef } from '@voltiso/transactor'
import { createTransactor, Doc, method } from '@voltiso/transactor'
import { Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

class A extends Doc('a').public({
	a: 1,
	b: sStrongRef<'b'>(),
}) {
	@method
	async setFriend(b: StrongRef<B>) {
		this.b = b
	}
}

class B extends Doc('b').public({
	b: 2,
	c: sStrongRef<'c'>(),
}) {
	@method
	async setFriend(c: StrongRef<C>) {
		this.c = c
	}
}

class C extends Doc('c').public({
	c: 3,
	d: sStrongRef<'d'>(),
}) {
	@method
	async setFriend(d: StrongRef<D>) {
		this.d = d
	}
}

class D extends Doc('d').public({
	d: 4,
	e: sStrongRef<'e'>(),
}) {
	@method
	async setFriend(e: StrongRef<E>) {
		this.e = e
	}
}

class E extends Doc('e').public({
	d: s.number,
	f: sStrongRef<'f'>(),
}) {
	@method
	async setFriend(f: StrongRef<F>) {
		this.f = f
	}
}

class F extends Doc('f').public({
	d: s.number,
	g: sStrongRef<'g'>(),
}) {
	@method
	async setFriend(g: StrongRef<G>) {
		this.g = g
	}
}

class G extends Doc('g').public({
	d: s.number,
	a: sStrongRef<'a'>(),
}) {
	@method
	async setFriend(a: StrongRef<A>) {
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
